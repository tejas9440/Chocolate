const Admin = require('./admin')
const Product = require('../db/Product');
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
    const id = req.body.id;
    try {
        const deleteProduct = await Product.findByIdAndDelete(id)
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