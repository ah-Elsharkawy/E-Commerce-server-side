const Product = require("../models/productModel");
const valid = require("../util/productsValidator");


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

let getProductById = async (req, res) =>{

    let id = req.params.id;
    try{

        let product = await Product.find().where("id").equals(id);
        console.log(`getting product number ${id}`);
        res.json(product);
    }
    catch(err){
        res.send(err);
    }
}

let updateProduct = async (req, res) =>{
    try{
        let id = req.params.id;
        let product = await Product.findOneAndUpdate({id: id}, req.body);
        res.json(product);

    }
    catch(err){
        console.log(err);
    }
}

let deleteProductById = async (req, res) =>{
    try{
        let p = await Product.findOneAndDelete({id: req.params.id});
        res.send(p);
    }
    catch(err){
        res.send(err);
    } 
}

let addProduct = async (req, res) =>{
    try{
        if(valid(req.body)){

            let product = new Product({
                id: req.body.id,
                title: req.body.title,
                price: req.body.price,
                description: req.body.description,
                category: req.body.category,
                image: req.body.image,
                rating: {
                    rate: req.body.rating.rate,
                    count: req.body.rating.count
                }
            })

            product.save().then(() => console.log("product added succesfully"))
            .catch(() => console.log("something went wrong"));
        }

        else{
            console.log(req.body)
            res.send((err) => err)
        }
    
    }
    catch(err){ 
        res.send(err);
    }
}




module.exports = {getAllProducts, getProductById, updateProduct, deleteProductById, addProduct};