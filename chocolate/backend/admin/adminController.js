const Admin = require('./admin')
const Product = require('../db/Product');
const Payment = require('../db/payment')
const Category = require('../db/Category')
module.exports.login = async(req,res) =>{
    if(req.body.password && req.body.email){
        let admin = await Admin.findOne(req.body).select('-password');
        if(admin){
            res.send({admin,adminId:admin._id})
        }
        else{
            res.send({result:'No Admin Found'})
        }
    }
    else{
        res.send({result:'Enter Email and Password'})
    }
}

module.exports.deleteProduct = async (req,res)=>{
    const productId = req.body.productId;
    try {
        const deleteProduct = await Product.findByIdAndDelete(productId)
        if (!deleteProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports.editProduct = async (req,res)=>{
    try {
        let result = await Product.updateOne(
            {_id:req.body.productId},
            {$set:{
                name:req.body.name,
                img:req.body.img,
                price:req.body.price,
                brand:req.body.brand,
            }}
        )
        if(!result){
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).send(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

}

module.exports.addProduct = async (req,res)=>{

    try {
        let data =  new Product({
            name:req.body.name,
            img:req.body.img,
            price:req.body.price,
            brand:req.body.brand,
        })
        let result = await data.save();
        res.send(result)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
        
}

module.exports.getByIdProduct = async(req,res)=>{
    let result = await Product.findOne({_id:req.params.id})
    if(result){
        res.send(result)
    }else{
        res.send({result:"Not Found"})
    }
}

module.exports.userDetail = async(req,res)=>{
    try {
        let data = await Payment.find({});
        if(data){
            res.status(200).send(data);
        }
        else{
            res.send({message:"No any order found"})
        }
    } catch (error) {
        console.log("Error: ",error)
    }
}

module.exports.category = async (req,res)=>{
    try {
        const { name, chocolateType } = req.body;
        const newCategory = new Category({
            name,
            chocolateType,
        })
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory)
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Error creating category' });
    }
}