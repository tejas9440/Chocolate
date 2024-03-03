const express = require('express');
const app = express();
const adminController = require('./admin/adminController')
require('./db/config')
const Product = require('./db/Product')
const cors = require('cors')
const User = require('./db/User')
const Payment = require('./db/payment')
const userController = require('./user/userController')
app.use(cors());
app.use(express.json());
const adminRouter = express.Router();

app.use('/admin',adminRouter)


app.get('/products',userController.getProduct)

app.get('/products/:id',userController.getProductById)

app.post('/signup',userController.signup)

app.post('/login',userController.login)

app.post('/remove-full-cart',userController.removeFullCart)

app.post('/remove-from-cart', userController.removeFromCart);

app.post('/add-to-cart', userController.addToCart);

app.post('/quantity',userController.quantity);

app.post('/get-user-cart', userController.getUserCart);

// app.post('/checkout',userController.checkout)

app.post('/create-checkout-session',userController.checkout)

app.post('/cash-on-delivery',userController.cashOnDelivery)

adminRouter.post('/addProduct',adminController.addProduct)

adminRouter.post('/login', adminController.login)

adminRouter.delete('/delete',adminController.deleteProduct);

adminRouter.put('/edit-product',adminController.editProduct);

adminRouter.get('/userDetail',adminController.userDetail)

// adminRouter.get('/edit-product/:id',)
app.listen(3030)