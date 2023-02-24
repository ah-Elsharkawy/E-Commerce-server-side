const express = require('express');
const router = express.Router();
const validator = require("../middelwares/AuthMWValidator")
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 


//registration 
router.post('/',validator, async (req, res) => {
    //check email existance
    let user = await User.findOne({email: req.body.email}).exec();
    if(!user) return res.status(404).send("Invalid email or password");

    //check password
    
    const validPswrd = await bcrypt.compare(req.body.password, user.password);
    if(!validPswrd) return res.status(400).send("Invalid email or password");
    // create the token
    const token = jwt.sign({
        usrid:user._id,
        adminRole: user.isAdmin
    }, "secretkey")

    // we can expose custom headers without using cors
    /* res.header("Access-Control-Expose-Headers", "x-auth-token") */

    // 3send the token
    res.header("x-auth-token", token)
    res.status(200).send({admin: user.isAdmin});
});


module.exports = router;