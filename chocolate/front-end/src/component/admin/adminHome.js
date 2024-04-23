import React, { useContext, useState } from 'react';
import choco from '../Choco.json';
import '../Home.css';
import { Link } from 'react-router-dom';
import '../Header.js'
import { useNavigate } from 'react-router-dom';
import { AddToCartContext } from '../Context';
import { useEffect } from 'react';
import { ProductContext } from '../Context';
import axios from 'axios';
import EditPopup from './editpopup.js';
import Swal from 'sweetalert2';

function AdminHome(props) {
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('adminId');
        if(!auth){
            navigate('/')
        }
    })

    const { products, setProdducts } = useContext(ProductContext);
    const handleDelete = async (productId) => {
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
                    let data = await fetch(`https://chocolate-3.onrender.com/admin/delete`, {
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
        let result = await fetch(`https://chocolate-3.onrender.com/products`)
        result = await result.json();
        setProdducts(result);
    }
    useEffect(() => {
        getProduct();
    }, [])

    return (
        <>
            <div className='container'>
                <div className='row'>
                    {products.map((choco, index) => {
                        return (
                            <>
                                <div className='col-lg-3 col-md-4 col-sm-6'>
                                    <div class="product-card">
                                        <div class="product-tumb">
                                            <img src={choco.img} alt="Chcoclate" onClick={()=> navigate('/products/' + choco._id)} />
                                        </div>
                                        <div class="product-details" >
                                            <h4 onClick={() => navigate('/products/' + choco._id)}>{choco.name}</h4>
                                            <p>{choco.brand}</p>
                                            <div class="product-bottom-details row">
                                                <button className='btn btn-outline-primary col-3' onClick={() => {
                                                    navigate('/admin/editProduct/' + choco._id)
                                                }}>Edit</button>

                                                <div class="product-links col">
                                                    <button className='btn btn-outline-danger' onClick={() => handleDelete(choco._id)}>Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </>
                        )
                    })}

                </div>
            </div>
            
        </>
    );
}

export default AdminHome;
