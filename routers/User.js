const express = require('express');
const router = express.Router();
const controller = require("../controllers/UsersController")


//registration 
router.post('/', controller.addUser)





module.exports = router;