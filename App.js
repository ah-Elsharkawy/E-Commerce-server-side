const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const productsRouter = require('./routers/products');


const app = express();
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/ecommerce").then(()=> {console.log("connected to the database ...")}).catch((e)=>{console.log(e)});

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use("/products", productsRouter);

app.listen(4000, ()=> console.log("listening to port ....."));

