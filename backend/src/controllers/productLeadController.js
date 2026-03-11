const ProductLead = require("../models/ProductLead");
const Customer = require("../models/Customer");


/* ADD PRODUCT INTEREST LEAD */

exports.addProductLead = async (req, res) => {

  try {

    const { name, phone, product, category, status } = req.body;

    const newLead = new ProductLead({
      name,
      phone,
      product,
      category,
      status,
      date: new Date()
    });

    const saved = await newLead.save();

    res.json(saved);

  } catch (err) {

    console.log("SAVE ERROR:", err);
    res.status(500).json(err);

  }

};



/* GET ALL PRODUCT LEADS */

exports.getProductLeads = async (req, res) => {

  try {

    const leads = await ProductLead.find().sort({ date: -1 });

    res.json(leads);

  } catch (err) {

    res.status(500).json(err);

  }

};



/* UPDATE LEAD STATUS */

exports.updateLeadStatus = async (req, res) => {

  try {

    const { status } = req.body;

    await ProductLead.findByIdAndUpdate(req.params.id, { status });

    res.json({ message: "Status updated" });

  } catch (err) {

    res.status(500).json(err);

  }

};



/* DELETE LEAD */

exports.deleteLead = async (req, res) => {

  try {

    await ProductLead.findByIdAndDelete(req.params.id);

    res.json({ message: "Lead deleted" });

  } catch (err) {

    res.status(500).json(err);

  }

};



/* GET TOTAL LEADS COUNT */

exports.getLeadCount = async (req, res) => {

  try {

    const count = await ProductLead.countDocuments();

    res.json({ count });

  } catch (err) {

    res.status(500).json(err);

  }

};



/* SAVE ORDER AFTER PAYMENT */

exports.createOrderLead = async (req, res) => {

  try {

    const { name, phone, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items received" });
    }

    const productNames = items.map(i => i.name).join(", ");
    const categories = items.map(i => i.category || "Product").join(", ");

    /* 1️⃣ SAVE PRODUCT LEAD */

    const newOrder = new ProductLead({
      name,
      phone,
      product: productNames,
      category: categories,
      status: "Ordered",
      date: new Date()
    });

    await newOrder.save();


    /* 2️⃣ CREATE CUSTOMER IF NOT EXISTS */

    const existingCustomer = await Customer.findOne({ phone });

    if (!existingCustomer) {

      const newCustomer = new Customer({
        name,
        phone
      });

      await newCustomer.save();
    }

    res.json({ message: "Order saved successfully" });

  } catch (error) {

    console.log("ORDER SAVE ERROR:", error);

    res.status(500).json({ message: "Order saving failed" });

  }

};