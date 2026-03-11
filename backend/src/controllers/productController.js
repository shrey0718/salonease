const Product = require("../models/Product");


/* ADD PRODUCT */

exports.addProduct = async (req, res) => {
  try {

    const { name, brand, price, category, quantity, image } = req.body;

    const newProduct = new Product({
      name,
      brand,
      price,
      category,
      quantity,
      image
    });

    await newProduct.save();

    res.json({ message: "Product saved successfully" });

  } catch (err) {
    console.log("ADD PRODUCT ERROR:", err);
    res.status(500).json(err);
  }
};



/* GET ALL PRODUCTS */

exports.getProducts = async (req, res) => {
  try {

    const products = await Product.find().sort({ createdAt: -1 });

    res.json(products);

  } catch (err) {

    res.status(500).json(err);

  }
};



/* PRODUCT COUNT (FOR DASHBOARD) */

exports.getProductCount = async (req, res) => {
  try {

    const count = await Product.countDocuments();

    res.json({ count });

  } catch (err) {

    res.status(500).json(err);

  }
};



/* UPDATE PRODUCT */

exports.updateProduct = async (req, res) => {
  try {

    const { name, brand, price, category, quantity, image } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        brand,
        price,
        category,
        quantity,
        image
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully" });

  } catch (err) {

    console.log("UPDATE PRODUCT ERROR:", err);
    res.status(500).json(err);

  }
};



/* DELETE PRODUCT */

exports.deleteProduct = async (req, res) => {
  try {

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });

  } catch (err) {

    console.log("DELETE PRODUCT ERROR:", err);
    res.status(500).json(err);

  }
};