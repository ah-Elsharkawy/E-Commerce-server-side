const express = require('express');
const router = express.Router();
const controller = require("../controllers/UsersController")


//registration 
router.post('/register', controller.addUser)


module.exports = router;