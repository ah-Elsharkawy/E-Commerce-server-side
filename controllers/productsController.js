const Product = require("../models/productModel");
const validate = require("../util/productsValidator");


let getAllProducts = async (req, res) =>{
    try{
        let products = await Product.find().select({_id:0});
        console.log("fetching products... ")
        res.json(products);
    }
    catch(err){
        console.log(err);
    }
}





module.exports = {getAllProducts};