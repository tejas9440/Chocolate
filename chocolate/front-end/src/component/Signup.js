import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Signup.css'

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[confirm,setConfirm] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            navigate('/')
        }
    })
    const collectData = async () => {
            

            let result = await fetch(`https://chocolate-s86f.onrender.com/signup`, {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        navigate('/login')
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            if(password == confirm){
                collectData();
            }
            else{
                alert('Enter Correct Password!!!')
            }
           
        }
    };
    return (
        <form onSubmit={handleSubmit}>
        <div className='signupall'>
            <h1 className="h1signup">Signup</h1>
            <label for="uname" style={{fontSize:'18px',}}><b>Name :</b></label>
            <input className='form-control ' onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Enter Name..." required/>

            <label for="uname" style={{fontSize:'18px'}}><b>Email :</b></label>
            <input className='form-control inputBox' onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter Email..." required/>

            <label for="uname" style={{fontSize:'18px'}}><b>Password :</b></label>
            <input className='form-control' onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Enter Password..." required/>

            <label for="uname" style={{fontSize:'18px'}}><b>Confirm Password :</b></label>
            <input className='form-control' onChange={(e) => setConfirm(e.target.value)} value={confirm} type="password" placeholder="Enter Password..." required/>

            <div class="container" style={{ backgroundColor: "#f1f1f1" }}>
                <div className="under">
                <button className='signupbtn' type="submit">Sign up</button>
                <button type="button" class="cancelbtn" onClick={() => {
                    navigate('/login')
                }}>Cancel</button>
                </div>
            </div>
        </div>
        </form>
    )
}
export default Signup;