const express = require("express")
const valid = require("../util/UsersValidator")
const User = require("../models/UserModel");
const bcrypt = require("bcrypt")

let addUser = async (req, res) => {
    console.log("user recieved ... ")
    if(valid(req.body)){
        

        try{
            
            // check if user exists
            let user = await User.findOne({email:req.body.email}).exec();
            
            if(user){
        
                return res.status(400).send("User already registered");
            }

            // hashing password
            let salt = await bcrypt.genSalt(10);
            let hashedPswd = await bcrypt.hash(req.body.password, salt);

            user = new User({
                email:req.body.email,
                name:req.body.name,
                password:hashedPswd,
                isAdmin:req.body.isAdmin
            })
            await user.save().then(() => console.log("user added"));
            res.status(200).send("ok");
        }
        catch(err){
            for(let e in err.errors){
                console.log(err.errors[e].message);
                res.status(400).send("Bad Request!");
            }
        }
        



    }
    else{
        res.status(403).send("forbidden command");
    }
}


module.exports = {addUser}