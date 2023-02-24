const jwt = require("jsonwebtoken")

// validate user authorities using jwt 
// this validator is used in the request pipeline
module.exports = (req, res, next) => {
    const token = req.header("x-auth-token");
    if(!token) return res.status(401).send("Access Denied..");

    try{
        const decodePayload = jwt.verify(token, "secretkey");
        if (!decodePayload.adminRole) return res.status(401).send("not authorized");
        next();
    }
    catch(err){
        res.status(400).send("Invalid token")
    }

}