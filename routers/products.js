const express = require("express");
const router = express.Router();
const controller = require("../controllers/productsController");





// get all products
router.get("/", controller.getAllProducts);

// get product by id
router.get("/:id", controller.getProductById)

// add new product

router.post("/", controller.addProduct)

// update product
router.put("/:id", controller.updateProduct)


// delete product by id
router.delete("/:id", controller.deleteProductById)


module.exports = router;