const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    brand: String,
    img: String,
    price: String,
    qty: Number
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

