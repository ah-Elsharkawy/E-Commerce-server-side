const express = require("express");
const router = express.Router();
const auth = require("../middelwares/AuthMWPermission")
const controller = require("../controllers/productsController");





// get all products
router.get("/", controller.getAllProducts);

// get product by id
router.get("/:id", controller.getProductById)

// add new product

router.post("/", auth, controller.addProduct)

// update product
router.put("/:id", auth, controller.updateProduct)


// delete product by id
router.delete("/:id", auth, controller.deleteProductById)


module.exports = router;