import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AddToCartContext } from './Context';
import { loadStripe } from '@stripe/stripe-js';

const Popup = (props) => {
    const userId = localStorage.getItem('userId')
    let price = '₹' + props.totalamount;
    const { addToCart, setAddToCart } = useContext(AddToCartContext);
    let cart = props.cart
    const [email, setEmail] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState();
    const [checkbox, setCheckbox] = useState(false);
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const makePayment = async () => {
        const stripe = await loadStripe('pk_test_51OglH5SC12VysppkpxfUikfPo1oBcdixodG5cbKd0nJLgDvqaQDtJi5qJ1s1MCSk7wUyvTdSDyYWa7LecxwwvRnG00uk76GB3X')
        const body = {
            products: cart,
            email: email
        };

        const headers = {
            'Content-Type': 'application/json'
        }

        const response = await fetch('https://chocolate-s86f.onrender.com/create-checkout-session', {
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
    useEffect(() => {
        setCheckbox(false)
        console.log(checkbox)
    }, [])
    const getCartCount = async () => {
        const userId = localStorage.getItem('userId');
        let result = await fetch(`https://chocolate-s86f.onrender.com/get-user-cart`, {
            method: 'post',
            body: JSON.stringify({ userId }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();

        if (userId) {
            setAddToCart(result.data.cart.length);
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            if (checkbox) {
                handlePayment();
            }
            else {
                makePayment();
            }
            setValidated(true);
        }
    };
    const deleteCartItem = async () => {
        const userId = localStorage.getItem('userId')
        let result = await fetch(`https://chocolate-s86f.onrender.com/remove-full-cart`, {
            method: 'post',
            body: JSON.stringify({ userId }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        getCartCount();
    }
    const handlePayment = async () => {
        props.onHide()
        const userId = localStorage.getItem('userId')
        let result = await fetch(`https://chocolate-s86f.onrender.com/cash-on-delivery`, {
            method: 'post',
            body: JSON.stringify({ userId, state, address, price, city, phoneNumber, email, cart }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.log(result)
        if (result) {
            Swal.fire({
                title: "Thank you for Order!",
                text: "Click ok to continue your shopping!",
                icon: "success"
            }).then((result) => {
                deleteCartItem();
                navigate('/')
            });
        }

    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Payment
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form class="row g-3 needs-validation" novalidate validated={validated} onSubmit={handleSubmit}>
                    <div class="col-md-8 position-relative">
                        <label for="validationTooltipUsername" class="form-label" >Email</label>
                        <div class="input-group has-validation">
                            <span class="input-group-text" id="validationTooltipUsernamePrepend">@</span>
                            <input type="email" class="form-control" id="validationTooltipUsername" aria-describedby="validationTooltipUsernamePrepend" required onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div class="col-md-6 position-relative">
                        <label for="validationTooltip03" class="form-label" >City</label>
                        <input type="text" class="form-control" id="validationTooltip03" required onChange={(e) => setCity(e.target.value)} />
                    </div>


                    <div class="col-md-6 mt-4 position-relative">
                        <label for="validationTooltip04" class="form-label">State</label>
                        <select class="form-select" id="validationTooltip04" required onChange={(e) => setState(e.target.value)}>
                            <option selected disabled value="">Choose...</option>
                            <option value='Gujrat'>Gujrat</option>
                            <option value='Maharastra'>Maharastra</option>
                            <option value='Madhya Pradesh'>Madhya Pradesh</option>
                            <option value='Andhra Pradesh'>Andhra Pradesh</option>
                            <option value='Punjab'>Punjab</option>
                            <option value='Delhi'>Delhi</option>
                        </select>
                        <div class="invalid-tooltip">
                            Please select a valid state.
                        </div>
                    </div>
                    <div class="col-md-3 position-relative">
                        <label for="validationTooltip05" class="form-label">Mobile No.</label>
                        <input type="tel" class="form-control" id="validationTooltip05" pattern=".{10}" required onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <div className='col-12'>
                        <label for="validationTextarea" class="form-label">Address</label>
                        <textarea class="form-control" id="validationTextarea" placeholder="Enter your address...." required onChange={(e) => setAddress(e.target.value)}></textarea>
                    </div>
                    {/* <div class="col-md-6 position-relative">
                        <input type="checkbox" id="scales" name="scales" />
                        <label for="scales" className='ms-3'>Scales</label>
                    </div> */}
                    <div class="form-check col-md-6 ms-2 position-relative">
                        {/* <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={(e)=>{
                            setCheckbox(e.target.checked)
                        }}/> */}
                        {checkbox ? <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked onChange={(e) => {
                            setCheckbox(e.target.checked)
                        }} /> : <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={(e) => {
                            setCheckbox(e.target.checked)
                        }} />}
                        <label class="form-check-label" for="flexCheckDefault">
                            Cash on Delivery
                        </label>
                    </div>

                    {/* <div class="col-12">
                        <button class="btn btn-outline-warning">Pay ₹{props.totalamount}</button>
                    </div> */}
                    {checkbox ? <div class="col-12">
                        <button class="btn btn-outline-warning">Pay on Delivery</button>
                    </div> :
                        <div class="col-12">
                            <button class="btn btn-outline-warning">Pay Online</button>
                        </div>
                    }
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default Popup;