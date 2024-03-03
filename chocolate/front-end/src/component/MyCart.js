import { useEffect, useState, useCallback, useContext } from "react";
// import choco from './Choco.json';
import Swal from "sweetalert2";
import 'animate.css';
import React from "react";
import './MyCart.css'
import { AddToCartContext } from './Context';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "./popup";
import { loadStripe } from '@stripe/stripe-js';

export default function MyCart(props) {
    const [modalShow, setModalShow] = useState(false);
    let items = props.purchaseItem;
    const { addToCart, setAddToCart } = useContext(AddToCartContext);
    const [amount, setAmount] = useState(0);
    const [data, setData] = useState([]);
    // const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const makePayment = async (email) => {
        const stripe = await loadStripe('pk_test_51OglH5SC12VysppkpxfUikfPo1oBcdixodG5cbKd0nJLgDvqaQDtJi5qJ1s1MCSk7wUyvTdSDyYWa7LecxwwvRnG00uk76GB3X')
        const body = {
            products: data,
            email: email
        };

        const headers = {
            'Content-Type': 'application/json'
        }

        const response = await fetch('http://localhost:3030/create-checkout-session', {
            method: "post",
            headers: headers,
            body: JSON.stringify(body)
        })

        const session = await response.json();

        try {
            await stripe.redirectToCheckout({
                sessionId: session.id
            });
        } catch (error) {
            console.error("Error redirecting to checkout:", error);
        }
    }
    const makeTotal = useCallback(() => {
        let sum = 0;
        data.forEach(item => {
            sum += parseInt(item.product.price.substring(1)) * item.quantity;
        });
        setAmount(sum);
        localStorage.setItem('cartAmount', sum);
    }, [data]);
    useEffect(() => {
        const storedAmount = localStorage.getItem('cartAmount');
        if (storedAmount) {
            setAmount(parseInt(storedAmount));
        }
        // const userString = localStorage.getItem('user');
        // const user = JSON.parse(userString);
        // const userEmail = user.user.email;
        // console.log(typeof(userEmail))
        // setEmail(userEmail)
    }, []);
    useEffect(() => {
        makeTotal();
    }, [makeTotal]);
    const getCartCount = async () => {
        const userId = localStorage.getItem('userId')
        let result = await fetch(`http://localhost:3030/get-user-cart`, {
            method: 'post',
            body: JSON.stringify({ userId }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        setAddToCart(result.data.cart.length)
    }
    const handleIncrement = async (productId, index) => {
        const userId = localStorage.getItem('userId')
        try {
            let response = await fetch(`http://localhost:3030/quantity`, {
                method: 'POST',
                body: JSON.stringify({ userId, productId, action: 'inc' }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                let responseData = await response.json(); // Parse response body as JSON
                const newProducts = [...data];
                newProducts[index].quantity = responseData.quantity;
                setData(newProducts);
            } else {
                throw new Error('Failed to fetch');
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };
    const handleDecrement = async (productId, index) => {
        const userId = localStorage.getItem('userId')
        try {
            const response = await axios.post('http://localhost:3030/quantity', {
                userId,
                productId,
                action: 'dec',
            });

            setData((prevData) => {
                const newData = [...prevData];
                newData[index] = {
                    ...newData[index],
                    quantity: response.data.quantity,
                };
                console.log(response.data.quantity)
                if (response.data.quantity === undefined) {
                    newData.splice(index, 1);
                    getCartCount();
                }
                makeTotal();
                return newData;
            });
        } catch (error) {
            console.error('Error updating quantity:', error);
        }

    };
    const handleRemove = async (productId, index) => {
        const userId = localStorage.getItem('userId')
        try {
            await axios.post('http://localhost:3030/remove-from-cart', {
                userId,
                productId,
            });

            setData((prevData) => {
                const newData = [...prevData];
                newData.splice(index, 1); // Remove the product from the array
                return newData;
            });
            getCartCount();
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };
    const getCart = async () => {
        const userId = localStorage.getItem('userId')

        try {
            let result = await fetch(`http://localhost:3030/get-user-cart`, {
                method: 'post',
                body: JSON.stringify({ userId }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            result = await result.json();
            setData(result.data.cart)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect((() => {
        makeTotal();
        getCart();
        getCartCount();
    }), [])
    return (
        <>
            <section class="pt-5 pb-5">
                <div class="container">
                    <div class="row w-100">
                        <div class="col-lg-12 col-md-12 col-12">
                            <h2 className="text-primary">Shopping Cart</h2>
                            <table id="shoppingCart" class="table table-condensed table-responsive">
                                <thead>
                                    <tr>
                                        <th style={{ width: "60%" }}>Product</th>
                                        <th style={{ width: "12%" }}>Price</th>
                                        <th style={{ width: "10%" }}>Quantity</th>
                                        <th style={{ width: "16%" }}></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {data.map((item, index) => {
                                        return (
                                            <tr>
                                                <td data-th="Product">
                                                    <div class="row">
                                                        <div class="col-md-3 text-left">
                                                            <img src={item.product.img} alt="" class="img-fluid d-none d-md-block rounded mb-2 shadow " />
                                                        </div>
                                                        <div class="col-md-9 text-left mt-sm-2">
                                                            <h4>{item.product.name}</h4>
                                                            <p class="font-weight-light">{item.product.brand}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td data-th="Price">{item.product.price}</td>
                                                <td data-th="Quantity">
                                                    <div className="d-flex " style={{ justifyContent: "space-between" }}>
                                                        <button className="btn btn-outline-primary" onClick={() => handleDecrement(item.product._id, index)}>-</button>
                                                        <span className="me-2 ms-2 " style={{ fontSize: "23px" }}>{item.quantity} </span>
                                                        <button className="btn btn-outline-primary" onClick={() => handleIncrement(item.product._id, index)}>+</button>
                                                        <span className="ms-5" style={{ cursor: "pointer", fontSize: "20px" }} onClick={() => handleRemove(item.product._id, index)}>&#10006;</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}

                                </tbody>
                            </table>
                            <div>
                                <h4>Subtotal:</h4>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="">
                                        <h1>₹ {amount}</h1>
                                    </div>
                                    <div className="ml-5">
                                        <button className="btn btn-outline-warning btn-lg pl-5 pr-5 me-3" onClick={() => navigate('/')}>Back to Shopping</button>
                                        <button className="btn btn-warning btn-lg pl-5 pr-5" onClick={() => {
                                            if (data.length == 0) {
                                                alert('Please add product in your cart')
                                                navigate('/')
                                            }
                                            else {
                                                const userString = localStorage.getItem('user');
                                                const user = JSON.parse(userString);
                                                const userEmail = user.user.email;
                                                // makePayment(userEmail);
                                                setModalShow(true)
                                            }
                                        }}>Checkout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <Popup
                cart={data}
                totalamount={amount}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}
