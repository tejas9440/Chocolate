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
        let result = await fetch(`https://chocolate-3.onrender.com/get-user-cart`, {
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
        let result = await fetch('https://chocolate-3.onrender.com/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        let admin = await fetch('https://chocolate-3.onrender.com/admin/login',{
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
            if(email=='' && password==''){
                alert('Enter Email and Password')
            }else if(email == '' && password!=''){
                alert('Enter Email')
            }
            else if(password == '' && email != ''){
                alert('Enter Password')
            }else{
                alert('Enter correct Email and Password')
            }
        }
    }
    
    return (
        <>
            <div className='fullForm'>            
                <div className='h1Login'>
                    <h1>Login</h1>
                </div>
                <div>
                    <label><b>Email:</b></label>
                    <input type="text" placeholder="Enter Username" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    <label><b>Password:</b></label>
                    <input type="password" placeholder="Enter Password"  value={password}  onChange={(e)=>{setPassword(e.target.value)}}/>
                        <button  className='loginbtn' onClick={handleLogin}>Login</button>
                </div>

                <div style={{backgroundColor:"#f1f1f1",display:'flex',justifyContent:'space-between',alignItems:'center'}}>
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