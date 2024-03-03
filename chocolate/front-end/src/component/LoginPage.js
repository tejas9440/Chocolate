import {React,useState,useEffect, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { AddToCartContext } from './Context';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const { addToCart, setAddToCart } = useContext(AddToCartContext);
    const [password, setPassword] = useState('');
    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            navigate('/')
            
        }
    })
    const getCartCount = async() =>{
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
    const handleLogin = async ()=>{
        let result = await fetch('http://127.0.0.1:3030/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        let admin = await fetch('http://127.0.0.1:3030/admin/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        
        result = await result.json();
        admin = await admin.json();
        if(result.user){
            localStorage.setItem('user',JSON.stringify(result))
            localStorage.setItem('userId',result.userId)
            getCartCount();
            navigate('/')
        }
        else if(admin.adminId){
            localStorage.setItem('adminId',admin.adminId)
            navigate('/admin')
        }
        else{
            alert('Enter correct')
        }
    }
    
    return (
        <>
            <div className='fullForm'>            
                <div className='h1Login'>
                    <h1>Login</h1>
                </div>
                <div>
                    <label><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    <label><b>Password</b></label>
                    <input type="password" placeholder="Enter Password"  value={password}  onChange={(e)=>{setPassword(e.target.value)}}/>
                        <button  className='loginbtn' onClick={handleLogin}>Login</button>
                </div>

                <div style={{backgroundColor:"#f1f1f1"}}>
                    <button class="cancelbtn" onClick={()=>{
                        navigate('/')
                    }}>Cancel</button>
                    <span className='signup'><Link to='/signup'>Signup?</Link></span>
                </div>
        
        </div>
        </>
    )

}

export default LoginPage;