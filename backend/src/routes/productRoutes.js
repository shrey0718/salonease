const express = require("express");
const router = express.Router();

const { addProduct, getProducts, getProductCount, updateProduct, deleteProduct } = require("../controllers/productController");

router.post("/add", addProduct);
router.get("/", getProducts);
router.get("/count", getProductCount);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
