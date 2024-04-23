import React, { useContext, useEffect, useState } from 'react';
import './Header.css';
import { Link, Outlet } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AddToCartContext } from './Context';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from './Context';
import Footer from './Footer';

function Header() {

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -4,
            top: 5,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));
    const [cartCount, setCartCount] = useState(0);
    const { addToCart, setAddToCart } = useContext(AddToCartContext); 
    const getProduct = async () => {
        let result = await fetch(`https://chocolate-3.onrender.com/products`)
        result = await result.json();
        setProdducts(result);
    }
    const getCartCount = async () => {
        const userId = localStorage.getItem('userId');
        let result = await fetch(`https://chocolate-3.onrender.com/get-user-cart`, {
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

    useEffect(() => {
        getCartCount();
    }, [addToCart]);

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
    const handleMilkChoco = async() =>{
        await getProduct();
        setProdducts(prevProducts =>Object.values(prevProducts).filter((item)=>item.name.includes("Milk")))    
    }
    const handleDarkChoco = async() =>{
        
        await getProduct();
        console.log(products)
        setProdducts(prevProducts =>Object.values(prevProducts).filter((item)=>item.name.includes("Dark")))
    }
    const handleWhiteChoco = async() =>{
        await getProduct();
        setProdducts(prevProducts =>Object.values(prevProducts).filter((item)=>item.name.includes("White")))
    }
    const handleKitkat = async() =>{
        await getProduct();
        setProdducts(prevProducts =>Object.values(prevProducts).filter((item)=>item.brand.toLowerCase().includes('kit')))    
    }
    const handleNestle = async() =>{
        await getProduct();
        setProdducts(prevProducts =>Object.values(prevProducts).filter((item)=>item.brand.toLowerCase().includes("nest")))
    }
    const handleLindt = async() =>{
        await getProduct();
        setProdducts(prevProducts =>Object.values(prevProducts).filter((item)=>item.brand.toLowerCase().includes("lindt")))
    }
    const handleBestSeller = async() =>{
        await getProduct();
        setProdducts(prevProducts =>Object.values(prevProducts).filter((item)=>item.brand.toLowerCase().includes("best")))
    }
    

    const auth = localStorage.getItem('user');
    const logout = () => {
        localStorage.clear();
        navigate('/')
        setAddToCart(0)
    }
    const navigate = useNavigate();

    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <img src="logo.jpg" alt="" style={{ width: "50px" }} />
                    <div className='d-flex'>
                        <Link class="nav-link" style={{ fontSize: "20px", fontFamily: "cursive", color: "rgb(111,78,55)" }} to='/'>Home</Link>

                    </div>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                    ChocolateTyep
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" style={{ fontSize: "20px", fontFamily: "cursive", color: "rgb(111,78,55)" }} onClick={getProduct}>All Chocolate</Link></li>
                                    <li><Link className="dropdown-item" style={{ fontSize: "20px", fontFamily: "cursive", color: "rgb(111,78,55)" }} onClick={handleMilkChoco}>Milk Chocolate</Link></li>
                                    <li><Link className="dropdown-item" to="#" style={{ fontSize: "20px", fontFamily: "cursive", color: "rgb(111,78,55)" }} onClick={handleDarkChoco}>Dark Chocolate</Link></li>
                                    <li><Link className="dropdown-item" to="#" style={{ fontSize: "20px", fontFamily: "cursive", color: "rgb(111,78,55)" }} onClick={handleWhiteChoco}>White Chocolate</Link></li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Brand
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="#" style={{ fontSize: "20px", fontFamily: "cursive", color: "rgb(111,78,55)" }} onClick={getProduct}>All Brand</Link></li>
                                    <li><Link className="dropdown-item" to="#" style={{ fontSize: "20px", fontFamily: "cursive", color: "rgb(111,78,55)" }} onClick={handleKitkat}>Kit Kat</Link></li>
                                    <li><Link className="dropdown-item" to="#" style={{ fontSize: "20px", fontFamily: "cursive", color: "rgb(111,78,55)" }} onClick={handleNestle}>Nestle</Link></li>
                                    <li><Link className="dropdown-item" to="#" style={{ fontSize: "20px", fontFamily: "cursive", color: "rgb(111,78,55)" }} onClick={handleLindt}>Lindt</Link></li>
                                </ul>
                            </li>

                            <li><Link style={{ fontSize: "20px", fontFamily: "cursive", color: "rgb(111,78,55)",marginLeft:'5px' }} onClick={handleBestSeller}>Best Selle</Link>r</li>
                            <li className='txtOfSrc'>

                                <input type='text' className='serarchtxt' placeholder='search your favorite...' onChange={Filters} />

                                <button className='btn btn-search btn-outline-danger'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search " viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg></button>
                            </li>

                            <li>

                                <div className='loInCart'>
                                    <li>
                                        <IconButton aria-label="cart" className='addToCart' onClick={() => {
                                            navigate('/myCart')
                                        }}>
                                            <StyledBadge badgeContent={addToCart} className='StyledBadge' color='primary'>
                                                <ShoppingCartIcon className='ShoppingCartIcon' />
                                            </StyledBadge>
                                        </IconButton>
                                    </li>
                                    {
                                        auth ? <li className='logIn' onClick={logout}>Logout<LogoutIcon sx={{ width: 34, height: 34 }} /></li>
                                            : <li className='logIn' onClick={() => {
                                                navigate('/login')
                                            }}>Login<LoginIcon sx={{ width: 34, height: 34 }} /></li>
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

export default Header;
