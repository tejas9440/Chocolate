const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    userId:mongoose.Schema.Types.ObjectId,
    address:{
        type:String,
        require:true
    },
    email: String,
    price:Number,
    state:String,
    phoneNumber:{
        type:Number,
        require:true
    },
    cart: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
});

const Payment = mongoose.model('payments', paymentSchema);
module.exports = Payment;
