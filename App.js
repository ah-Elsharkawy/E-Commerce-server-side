require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const productsRouter = require('./routers/products');
const usersRouter = require('./routers/User');
const authRouter = require('./routers/auth')
const adminRouter = require("./routers/admin")


const app = express();
const PORT = process.env.PORT || 5000;
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI).then(()=> {console.log("connected to the database ...")}).catch((e)=>{console.log(e)});

// using cors to allow some or all origins access to the server and define access methods

// here we allow all origins and all methods 
app.use(cors({
    // exposing custom header so that client can access it
    exposedHeaders: 'x-auth-token'
}))

// urlencoded used to parse the request query string
app.use(express.urlencoded({extended:true}))

//express.json used to parse the request body
app.use(express.json());
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/login", authRouter);
app.use("/admin", adminRouter);



 
app.listen(PORT, ()=> console.log(`listening to port ${PORT}`));

