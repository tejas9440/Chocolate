import React, { useEffect } from "react"
import './success.css'
import { useNavigate } from "react-router-dom";
const SuccessPage = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(()=>{
        if(user.cart.length == 0){
            navigate('/')
        }
    })
    
    const handleBack = async() =>{
        const userId = localStorage.getItem('userId')
        const result = await fetch('http://localhost:3030/remove-full-cart',{
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId})
        })
        if(result.status ==200){
            navigate('/')
        }
    }
    return (
        <>
            <div class="vh-100 d-flex justify-content-center align-items-center">
                <div class="col-md-4">
                    <div class="card  bg-white shadow p-5">
                        <div class="mb-4 text-center">
                            <svg class="checkmarkr" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                <circle class="checkmark__circler" cx="26" cy="26" r="25" fill="none" />
                                <path class="checkmark__checkr" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                            </svg>
                        </div>
                        <div class="text-center">
                            <h1>Thank You For Ordering!!</h1>
                            <p>Click button
                                countinue shopping your favorite Chocolates</p>
                            <button class="btn btn-outline-success" onClick={handleBack}>Back Home</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default SuccessPage;