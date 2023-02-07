const express = require("express")
const router = express.Router();
const User = require("../models/UserModel");
const auth = require("../middelwares/AuthMWPermission")

/* router.put("/:id", auth, async(req, res)=>{
    try{
        let user = await User.findByIdAndUpdate({_id: req.params.id}, {isAdmin:true});
        res.status(200).send("User is set to admin");
        console.log(`user ${user.name} is set to admin`);
    }
    catch(err){
        res.status(500).send("internal server error");
        console.log("internal error");
    }
}) */


// update user privileges ... setting user to admin
router.put("/:id", auth, (req, res) => {
        User.findByIdAndUpdate({_id: req.params.id}, {isAdmin:true}, function(err, data){
        if(!err){
            if(data){
                res.status(200).send("User is set to admin");
                console.log("user is set to admin");
            }
            else{
                res.status(400).send("User not found");
                console.log("user not found");

            }
        }
        else{
            res.status(500).send("internal serverr error");
            console.log("internal error");

        }
    })
})




module.exports = router;

