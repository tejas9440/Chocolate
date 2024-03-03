import React from "react"
import './cancel.css'
import { useNavigate } from "react-router-dom";
const CancelPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <div class="vh-100 d-flex justify-content-center align-items-center">
                <div class="col-md-4">
                    <div class="card  bg-white shadow p-5">
                        <div class="mb-4 text-center">
                            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                <path class="checkmark__check" fill="none" d="M16 16 36 36 M36 16 16 36" />
                            </svg>
                        </div>
                        <div class="text-center">
                            <h1>Your order is cancel!!</h1>
                            <p>Click button
                                countinue shopping your favorite Chocolates</p>
                            <button class="btn btn-outline-success" onClick={() => navigate('/')}>Back Home</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default CancelPage;