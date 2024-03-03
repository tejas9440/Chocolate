const { default: Stripe } = require('stripe');
const Product = require('../db/Product');
const User = require('../db/User')
const Payment = require('../db/payment')
const stripe = require("stripe")("sk_test_51OglH5SC12Vysppk7WHq9TOTZq44AEvKQRdONwvwT3nqbBZTNM7HysgpIVRjr3uiZ9nQcUXo576TbAgt2WWIqpJx00RfHa8YM2");

module.exports.getProduct = async (req, res) => {
    let products = await Product.find();

    if (products) {
        res.send(products)
    }
    else {
        res.send({ result: "No Product Avilable..." })
    }
}

module.exports.getProductById = async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    } else {
        res.send({ result: "Not Found" })
    }
}

module.exports.signup = async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
}

module.exports.login = async (req, res) => {

    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select('-password');
        if (user) {
            res.send({ user, userId: user._id })
        }
        else {
            res.send({ result: 'No user Found' })
        }
    }
    else {
        res.send({ result: 'Enter Email and Password' })
    }
}

module.exports.removeFullCart = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            user.cart = []
            await user.save();
            return res.status(200).json({ success: true, message: 'All products removed from cart.' });
        }
    } catch (error) {
        throw new Error('Error removing products from cart.');
    }
}

module.exports.removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const productIndex = user.cart.findIndex(item => item.product.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in user cart' });
        }
        user.cart.splice(productIndex, 1);
        await user.save();

        return res.status(200).json({ message: 'Product removed from cart successfully' });
    } catch (error) {
        console.error('Error removing product from cart:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


module.exports.addToCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const productId = req.body.productId;

        const user = await User.findById(userId);

        if (!user) {
            return res.send({ code: 404, message: "User not found" });
        }

        const isProductInCart = user.cart.some(item => item.product.toString() === productId);

        if (isProductInCart) {
            return res.send({ code: 400, message: "Product is already in the cart" });
        }

        const isUpdate = await User.updateOne(
            { _id: userId },
            {
                $addToSet: {
                    cart: { product: productId }
                }
            }
        );
        if (isUpdate.modifiedCount === 1) {
            return res.send({ code: 200, message: "Success" });
        } else {
            return res.send({ code: 400, message: "Product is already in the cart" });
        }
    } catch (error) {
        console.error(error);
        return res.send({ code: 500, message: "Server error" });
    }
}


module.exports.quantity = async (req, res) => {
    const { userId, productId, action } = req.body;

    try {
        let updatedquantity;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const productIndex = user.cart.findIndex(item => item.product.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in user cart' });
        }
        if (action === 'inc') {
            updatedquantity = user.cart[productIndex].quantity + 1;
            user.cart[productIndex].quantity = updatedquantity; // Update the quantity in the user's cart
            await user.save();
        } else if (action === 'dec') {
            if (user.cart[productIndex].quantity > 1) {
                updatedquantity = user.cart[productIndex].quantity - 1;
                user.cart[productIndex].quantity = updatedquantity; // Update the quantity in the user's cart
                await user.save();
            } else {
                user.cart.splice(productIndex, 1);
                await user.save();
                return res.status(200).json({ message: 'Product removed from cart' });
            }
        } else {
            return res.status(400).json({ message: 'Invalid action' });
        }

        res.status(200).json({ quantity: updatedquantity || 0 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports.getUserCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const productId = req.body.productId;

        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $push: { cart: productId } },
            { new: true }
        ).populate('cart.product');

        return res.send({ code: 200, message: "Product added to cart successfully", data: updatedUser });
    } catch (error) {
        console.error(error);
        return res.send({ code: 500, message: "Server Error" });
    }
}

module.exports.cashOnDelivery = async (req,res)=>{
    try {   
        let payment = new Payment({
            userId:req.body.userId,
            state:req.body.state,
            address:req.body.address,
            price:req.body.price,
            city:req.body.city,
            phoneNumber:req.body.phoneNumber,
            email:req.body.email,
            cart:req.body.cart,
        });
        let result = await payment.save();
        res.send(result)
    } catch (error) {
        return res.send({code:500,message: "Server Error"})
    }
}

module.exports.checkout = async (req, res) => {
    const { products, email } = req.body
    const priceWithCurrencySymbol = "₹200"; // Example: assuming ₹200
    const currencyCode = priceWithCurrencySymbol.replace(/\d+/g, '').trim(); 
    
    const lineItems = products.map((product) => {
        const priceWithoutCurrency = parseFloat(product.product.price.replace('₹', ''));
        return {
            price_data: {
                currency: "inr",
                product_data: {
                    name: product.product.name,
                    images: [product.product.img]
                },
                unit_amount: Math.round(priceWithoutCurrency * 100)
            },
            quantity: product.quantity
        }
    });
    const sessionOptions = {
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
        customer_email: email,
        billing_address_collection: 'required'
    };
    
    if (currencyCode.toUpperCase() !== 'INR') {
        sessionOptions['shipping_address_collection'] = {
            allowed_countries: ['US'] // Assuming you want shipping address outside India
        };
    }
    const session = await stripe.checkout.sessions.create(sessionOptions);
    res.json({ id: session.id })
}