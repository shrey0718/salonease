const ClassLead = require("../models/ClassLead");

exports.addClassLead = async (req, res) => {
  try {
    const { name, phone, course, category, status } = req.body;

    const newLead = new ClassLead({
      name,
      phone,
      course,
      category,
      status
    });

    await newLead.save();
    res.json({ message: "Class lead saved successfully" });

  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getClassLeads = async (req, res) => {
  try {
    const leads = await ClassLead.find().sort({ date: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateClassLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;

    await ClassLead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({ message: "Status updated" });

  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteClassLead = async (req, res) => {
  try {
    await ClassLead.findByIdAndDelete(req.params.id);
    res.json({ message: "Lead deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getClassLeadCount = async (req, res) => {
  try {
    const count = await ClassLead.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json(err);
  }
};
