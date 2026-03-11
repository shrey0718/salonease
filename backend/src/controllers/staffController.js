const Staff = require("../models/Staff");

/* ADD STAFF */

exports.addStaff = async (req, res) => {
  try {

    const { name, phone, role, experience, status } = req.body;

    const newStaff = new Staff({
      name,
      phone,
      role,
      experience,
      status
    });

    await newStaff.save();

    res.json({ message: "Staff added successfully" });

  } catch (err) {
    res.status(500).json(err);
  }
};



/* GET ALL STAFF */

exports.getStaff = async (req, res) => {
  try {

    const staff = await Staff.find().sort({ createdAt: -1 });

    res.json(staff);

  } catch (err) {
    res.status(500).json(err);
  }
};



/* GET STAFF COUNT */

exports.getStaffCount = async (req, res) => {
  try {

    const count = await Staff.countDocuments();

    res.json({ count });

  } catch (err) {
    res.status(500).json(err);
  }
};



/* UPDATE STAFF */

exports.updateStaff = async (req, res) => {
  try {

    const { name, phone, role, experience, status } = req.body;

    await Staff.findByIdAndUpdate(
      req.params.id,
      { name, phone, role, experience, status },
      { new: true }
    );

    res.json({ message: "Staff updated successfully" });

  } catch (err) {
    res.status(500).json(err);
  }
};



/* DELETE STAFF */

exports.deleteStaff = async (req, res) => {
  try {

    await Staff.findByIdAndDelete(req.params.id);

    res.json({ message: "Staff deleted successfully" });

  } catch (err) {
    res.status(500).json(err);
  }
};