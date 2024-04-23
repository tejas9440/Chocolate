import React, { useContext, useEffect, useState } from 'react';
import '../Header.css';
import { Link, Outlet } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../Context';
function AdminNavbar() {
    const navigate = useNavigate();
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -4,
            top: 5,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));
    const getProduct = async () => {
        let result = await fetch(`https://chocolate-3.onrender.com/products`)
        result = await result.json();
        setProdducts(result);
    }
    useEffect(()=>{
        const auth = localStorage.getItem('adminId');
        if(!auth){
            navigate('/')
        }
    })

    const { products, setProdducts } = useContext(ProductContext);

    const Filters = (e) => {
        if (e.target.value) {
            let result = Object.values(products)
            let filteredKey = result.filter((item) => item.name.toLowerCase().includes(e.target.value))
            setProdducts(filteredKey)
        }
        else {
            getProduct();
        }
    }

    const auth = localStorage.getItem('adminId');
    const logout = () => {
        localStorage.clear();
        navigate('/')
    }
    
    
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <img src="logo.jpg" alt="" style={{ width: "50px" }} />
                    <div className='d-flex'>
                    <Link class="nav-link" style={{fontSize: "20px",fontFamily: "cursive",color: "rgb(111,78,55)"}} to='/admin'>Home</Link>
                    <Link class="nav-link" style={{fontSize: "20px",fontFamily: "cursive",color: "rgb(111,78,55)"}} to='/admin/addProduct'>Add Product</Link>
                    <Link class="nav-link" style={{fontSize: "20px",fontFamily: "cursive",color: "rgb(111,78,55)"}} to='/admin/userDetail'>User Detail</Link>
                    </div>
                    
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className='txtOfSrc'>

                                <input type='text' className='serarchtxt' placeholder='search your favorite...' onChange={Filters} />

                                <button className='btn btn-search btn-outline-danger'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search " viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg></button>
                            </li>

                            <li>

                                <div className='loInCart'>
                                    {
                                        auth ? <li className='logIn' onClick={logout}><LogoutIcon  sx={{ width: 54, height: 34 }}  />Logout</li>
                                            : <li className='logIn'  onClick={() => {
                                                navigate('/login')
                                            }}><LoginIcon  sx={{ width: 54, height: 34 }}/>Login</li>
                                    }


                                    
                                </div>
                            </li>




                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
}

export default AdminNavbar;
