const mongoose = require('mongoose');

const UserItems = mongoose.Schema(
    {
        uid: {
            type:String,
            require:true
        },
        productid:{
            type:String,
            require:true
        },  
        items:[{type:String}]
    }
)

module.exports = mongoose.Model('userItems',UserItems);