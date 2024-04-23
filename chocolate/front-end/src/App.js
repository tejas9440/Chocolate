import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Home from './component/Home';
import Footer from './component/Footer';
import { useState } from 'react';
import './App.css';
import Detail from './component/Detail';
import { AddToCartContext } from './component/Context';
import { SerachContext } from './component/Context';
import { ProductContext } from './component/Context';
import MyCart from './component/MyCart';
import LoginPage from './component/LoginPage';
import Signup from './component/Signup';
import PrivateComponent from './component/PrivateComponent';
import AdminNavbar from './component/admin/adminNavbar';
import AdminHome from './component/admin/adminHome';
import EditPopup from './component/admin/editpopup';
import AddProduct from './component/admin/addproduct';
import SuccessPage from './component/successPage';
import CancelPage from './component/cancel';
import UserDetail from './component/admin/userDetail';
function App() {

  const [addToCart, setAddToCart] = useState(0);
  const [myCart,setMyCart] = useState([]);
  const [search,setSearch] = useState('');
  const [products,setProdducts] = useState([]);
  const addToCartFun = (item) =>{
    let temp = [...myCart,item];
    console.log("Temp: "+temp)
    setMyCart(temp);
  }

  return (<>
  <ProductContext.Provider value={{products,setProdducts}}>  
    <SerachContext.Provider value={{search,setSearch}}>
    <AddToCartContext.Provider value={{addToCart,setAddToCart}}>
      <Router>
        <Routes>
            <Route path='/' element={<Header/>}> 
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/signup' element={<Signup />} />
            <Route path='/' element={<Home purchaseItem = {addToCartFun}/>} />
            <Route path='/products/:id' element={<Detail />} />
            <Route element={<PrivateComponent/>}>
            <Route path='/myCart' element={<MyCart purchaseItem = {myCart}/>}/>
            </Route> 
            
            </Route>
            <Route path='/admin' element={<AdminNavbar/>}>
              <Route index element={<AdminHome/>}/>
              <Route path='/admin/editProduct/:id' element={<EditPopup />}/>
              <Route path='/admin/addProduct' element={<AddProduct/>}/>
              <Route path='/admin/userDetail' element={<UserDetail/>}/>
            </Route>
            <Route path='/success' element={<SuccessPage/>}></Route>
            <Route path='/cancel' element={<CancelPage/>}></Route>
        </Routes>
        
      </Router>
      </AddToCartContext.Provider>
    </SerachContext.Provider>
    </ProductContext.Provider>
    </>
  );
}

export default App;
