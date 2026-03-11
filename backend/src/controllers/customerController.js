const Customer = require("../models/Customer");


/* ADD CUSTOMER (MANUAL ADMIN ADD) */

exports.addCustomer = async (req, res) => {
  try {

    const { name, phone, email } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: "Name and phone required" });
    }

    /* prevent duplicate customers */

    const existingCustomer = await Customer.findOne({ phone });

    if (existingCustomer) {
      return res.json({ message: "Customer already exists" });
    }

    const newCustomer = new Customer({
      name,
      phone,
      email
    });

    await newCustomer.save();

    res.json({ message: "Customer saved successfully" });

  } catch (err) {

    console.log("ADD CUSTOMER ERROR:", err);
    res.status(500).json(err);

  }
};



/* GET ALL CUSTOMERS */

exports.getCustomers = async (req, res) => {
  try {

    const customers = await Customer.find().sort({ createdAt: -1 });

    res.json(customers);

  } catch (err) {

    console.log("GET CUSTOMERS ERROR:", err);
    res.status(500).json(err);

  }
};



/* CUSTOMER COUNT FOR DASHBOARD */

exports.getCustomerCount = async (req, res) => {
  try {

    const count = await Customer.countDocuments();

    res.json({ count });

  } catch (err) {

    console.log("COUNT ERROR:", err);
    res.status(500).json({ count: 0 });

  }
};



/* UPDATE CUSTOMER */

exports.updateCustomer = async (req, res) => {
  try {

    const { name, phone, email } = req.body;

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name, phone, email },
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({ message: "Customer updated successfully" });

  } catch (err) {

    console.log("UPDATE CUSTOMER ERROR:", err);
    res.status(500).json(err);

  }
};



/* DELETE CUSTOMER */

exports.deleteCustomer = async (req, res) => {
  try {

    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({ message: "Customer deleted successfully" });

  } catch (err) {

    console.log("DELETE CUSTOMER ERROR:", err);
    res.status(500).json(err);

  }
};