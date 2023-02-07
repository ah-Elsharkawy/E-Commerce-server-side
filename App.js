const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const productsRouter = require('./routers/products');
const usersRouter = require('./routers/User');
const authRouter = require('./routers/auth')
const adminRouter = require("./routers/admin")

const app = express();
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/ecommerce").then(()=> {console.log("connected to the database ...")}).catch((e)=>{console.log(e)});

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

// we should get the port and the host from the environment variables (.env) file or from config file .env can be used after installing dotenv package
// using the global variable process as follows process.env.PORT we define port at .env file 
app.listen(4000, ()=> console.log("listening to port 4000"));

