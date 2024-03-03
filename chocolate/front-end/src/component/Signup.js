import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Signup.css'

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            navigate('/')
        }
    })
    const collectData = async () => {
        let result = await fetch(`http://localhost:3030/signup`, {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        navigate('/')
        localStorage.setItem('user', JSON.stringify(result))
        localStorage.setItem('userId',result._id)
    }
    return (
        <div className='signupall'>
            <h1 className="h1signup">Signup</h1>
            <label for="uname"><b>Name</b></label>
            <input className='inputBox' onChange={(e) => {
                setName(e.target.value)
            }} value={name} type="text" placeholder="Enter Name..." />

            <label for="uname"><b>Email</b></label>
            <input className='inputBox' onChange={(e) => {
                setEmail(e.target.value)
            }} value={email} type="text" placeholder="Enter Email..." />

            <label for="uname"><b>Password</b></label>
            <input className='inputBox' onChange={(e) => {
                setPassword(e.target.value)
            }} value={password} type="password" placeholder="Enter Password..." />

            <div class="container" style={{ backgroundColor: "#f1f1f1" }}>
                <div className="under">
                <button onClick={collectData} className='signupbtn'>Signup</button>
                <button type="button" class="cancelbtn" onClick={() => {
                    navigate('/')
                }}>Cancel</button>
                </div>
            </div>


        </div>
    )
}
export default Signup;