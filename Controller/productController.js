const Product = require("../Model/Products");

const addProduct = async(req,res)=>{
    try {
        const newProduct = new Product({
            name:req.body.name,
            price:req.body.price,
            category:req.body.category,
            image:req.file.filename,
        });
        
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

const getProducts = async (req,res)=>{
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
module.exports={
    addProduct,
    getProducts
}