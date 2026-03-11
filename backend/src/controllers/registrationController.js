const Registration = require("../models/Registration");


/* ADD REGISTRATION */

exports.addRegistration = async (req, res) => {

  try {

    const { name, phone, email, category, course, image } = req.body;

    const newRegistration = new Registration({
      name,
      phone,
      email,
      category,
      course,
      image
    });

    await newRegistration.save();

    res.json({ message: "Registration saved successfully" });

  } catch (err) {

    console.log("ADD REGISTRATION ERROR:", err);
    res.status(500).json(err);

  }

};



/* GET ALL REGISTRATIONS */

exports.getRegistrations = async (req, res) => {

  try {

    const registrations = await Registration.find().sort({ createdAt: -1 });

    res.json(registrations);

  } catch (err) {

    res.status(500).json(err);

  }

};



/* GET REGISTRATION COUNT */

exports.getRegistrationCount = async (req, res) => {

  try {

    const count = await Registration.countDocuments();

    res.json({ count });

  } catch (err) {

    res.status(500).json(err);

  }

};



/* UPDATE REGISTRATION */

exports.updateRegistration = async (req, res) => {

  try {

    const { name, phone, email, category, course, image } = req.body;

    const updated = await Registration.findByIdAndUpdate(
      req.params.id,
      {
        name,
        phone,
        email,
        category,
        course,
        image
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.json({ message: "Registration updated successfully" });

  } catch (err) {

    console.log("UPDATE REGISTRATION ERROR:", err);
    res.status(500).json(err);

  }

};



/* DELETE REGISTRATION */

exports.deleteRegistration = async (req, res) => {

  try {

    const deleted = await Registration.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.json({ message: "Registration deleted successfully" });

  } catch (err) {

    console.log("DELETE REGISTRATION ERROR:", err);
    res.status(500).json(err);

  }

};