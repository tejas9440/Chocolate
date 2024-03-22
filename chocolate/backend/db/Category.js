const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: String, // Add a name for the category
    chocolateType: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
});

const Category = mongoose.model('catogory', categorySchema);
module.exports = Category;

