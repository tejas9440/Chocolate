import React, { useContext } from 'react';
import choco from './Choco.json';
import './Home.css';
import { Link } from 'react-router-dom';
import './Header.js'
import { useNavigate } from 'react-router-dom';
import { AddToCartContext } from './Context';
import { useEffect } from 'react';
import { ProductContext } from './Context';
import axios from 'axios';

function Home(props) {
    const navigate = useNavigate();
    const { addToCart, setAddToCart } = useContext(AddToCartContext);
    const addToCartBtn = (index) => {
        let product = choco[index];
        props.purchaseItem(product);
    }

    const { products, setProdducts } = useContext(ProductContext);

    const getProduct = async () => {
        let result = await fetch(`http://localhost:3030/products`)
        result = await result.json();
        setProdducts(result);
    }
    useEffect(() => {
        getProduct();
    }, [])
    const handleAddtoCart=async(productId)=>{
        const userId = localStorage.getItem('userId')
        if(!userId){
            navigate('/login')
        }
        try {
            let result = await fetch(`http://localhost:3030/add-to-cart`, {
                method: 'post',
                body: JSON.stringify({ userId,productId }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            result = await result.json();
            if(result.code == 400){
                alert('Product is already in your cart')
            }
            const cartLengthResult = await axios.post('http://localhost:3030/get-user-cart', { userId });
        const updatedCartLength = cartLengthResult.data.data.cart.length;
        setAddToCart(updatedCartLength);
        } catch (error) {
            console.log(error)
        }
       
        
    }

    return (
        <>
            <div id="carouselExampleFade" class="carousel slide carousel-fade m-5" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active d-block">
                        <img src="https://img.freepik.com/free-photo/indulgent-dark-chocolate-slice-rustic-wood-table-generated-by-ai_24640-91506.jpg" alt="Chocolate" style={{ width: "100%" }} />
                    </div>
                    <div class="carousel-item d-block">
                        <img src="https://img.freepik.com/free-photo/dark-chocolate-brownie-slice-with-homemade-icing-generated-by-ai_188544-16024.jpg" alt="Chocolate" style={{ width: "100%" }} />
                    </div>
                    <div class="carousel-item d-block">
                        <img src="https://img.freepik.com/free-photo/indulgent-chocolate-dessert-broken-ready-eat-generated-by-ai_24640-86689.jpg" alt="Chocolate" style={{ width: "100%" }} />
                    </div>
                    <div class="carousel-item d-block">
                        <img src="https://img.freepik.com/free-photo/ancient-leather-bound-book-burning-spooky-library-generated-by-ai_188544-31808.jpg" alt="Chocolate" style={{ width: "100%" }} />
                    </div>
                    <div class="carousel-item d-block">
                        <img src="https://img.freepik.com/free-photo/indulgent-chocolate-truffle-snack-gourmet-delight-generated-by-ai_188544-25239.jpg" alt="Chocolate" style={{ width: "100%" }} />
                    </div>
                    <div class="carousel-item d-block">
                        <img src="https://img.freepik.com/free-photo/indulgent-dessert-dark-chocolate-fudge-with-strawberries-generated-by-ai_188544-22763.jpg" alt="Chocolate" style={{ width: "100%" }} />
                    </div>
                    <div class="carousel-item d-block">
                        <img src="https://img.freepik.com/free-photo/indulgent-chocolate-cake-slice-with-creamy-icing-generated-by-ai_188544-24196.jpg" alt="Chocolate" style={{ width: "100%" }} />
                    </div>
                    <div class="carousel-item d-block">
                        <img src="https://img.freepik.com/free-photo/indulgent-dark-chocolate-slice-rustic-wood-plate-generated-by-ai_24640-86380.jpg" alt="Chocolate" style={{ width: "100%" }} />
                    </div>
                    <div class="carousel-item d-block">
                        <img src="https://img.freepik.com/free-photo/chocolate-dessert-gourmet-indulgence-decorated-with-icing-generative-ai_188544-9468.jpg" alt="Chocolate" style={{ width: "100%" }} />
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

            <div className='container'>
                <h1 className='text-center'>
                    <u>Best Seller</u>
                </h1>
            </div>
            <div className='container'>
            {/* <div className='col-sm-10'> */}
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
                                            <h4  onClick={()=> navigate('/products/' + choco._id)}>{choco.name}</h4>
                                            <p>{choco.brand}</p>
                                            <div class="product-bottom-details row">
                                                <div class="product-price col-3">{choco.price}</div>
                                                <div class="product-links col">
                                                <button className='btn btn-outline-warning' onClick={()=>handleAddtoCart(choco._id)}>Add to cart</button>
                                                </div>
                                            </div>         
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}

                </div>
            {/* </div> */}
            </div>
        </>
    );
}

export default Home;
