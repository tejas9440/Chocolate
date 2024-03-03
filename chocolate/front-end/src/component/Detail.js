import { useNavigate, useParams } from "react-router-dom"
import choco from './Choco.json';
import './Detail.css'
import { AddToCartContext } from "./Context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const Detail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState({});
    const { addToCart, setAddToCart } = useContext(AddToCartContext);
    let productId = id;
    const auth = localStorage.getItem('adminId')
    // let chocoimg = "img"
    // let chochoname = "name"
    // let chochobrand = "brand"
    // let chochoprice = "price"
    // let res = choco.filter((item) => {

    //     return item.id == idWant;
    // })
    const handleDelete = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure want to delete?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0d6efd",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    let data = await fetch(`http://localhost:3030/admin/delete`, {
                        method: 'delete',
                        body: JSON.stringify({ productId }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    data = await data.json();
                    console.log(data);
                    if (data.message) {
                        Swal.fire({
                            title: "Product is Successfully Delete!",
                            text: "Click ok button to countiue!",
                            icon: "success",
                            confirmButtonColor: "#0d6efd",
                        }).then((result) => {
                            if (result) {
                                getProduct();
                                navigate('/admin')
                            }
                        });
                    }
                } catch (error) {
                    console.log(error)
                }
                
            }
        });
    }
    const getProduct = async () => {
        let result = await fetch(`http://localhost:3030/products/${id}`)
        result = await result.json();
        setData(result);
    }
    const handleAddtoCart = async () => {
        const userId = localStorage.getItem('userId')
        console.log(userId)
        try {
            let result = await fetch(`http://localhost:3030/add-to-cart`, {
                method: 'post',
                body: JSON.stringify({ userId, productId }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            result = await result.json();
            console.log(result)
            if (result.code == 400) {
                alert('Product is already in your cart')
            }
            if (userId) {

                const cartLengthResult = await axios.post('http://localhost:3030/get-user-cart', { userId });
                const updatedCartLength = cartLengthResult.data.data.cart.length;
                setAddToCart(updatedCartLength);
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getProduct();
    })

    return (
        <>
            <div className="container">
                <div className="row chocodetail">
                    <div className="col-3">
                        <img src={data.img} alt='chocho' className="chocoimage" />
                    </div>
                    <div className="col choconame">
                        <h2>{data.name}</h2>
                        <span className="brand">Brand: {data.brand}</span>
                        <br />
                        <br />
                        <span className="chocoprice">{data.price}</span>
                        <div className="btns">
                            <button className="btn btn-outline-warning backbtn" onClick={() => {
                                !auth ? navigate('/') : navigate('/admin')

                            }}>Back</button>
                            {/* <button className="btn btn-warning addtocartbtn" onClick={handleAddtoCart}>Add to Cart</button> */}
                            {!auth ? <button className="btn btn-warning addtocartbtn" onClick={handleAddtoCart}>Add to Cart</button>
                                : <><button className="btn btn-primary addtocartbtn" onClick={() => { navigate('/admin/editProduct/' + data._id) }}>Edit</button>
                                    <button className="btn btn-danger addtocartbtn" onClick={handleDelete}>Delete</button>
                                </>

                            }
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Detail;