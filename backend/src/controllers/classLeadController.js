const ClassLead = require("../models/ClassLead");
const Registration = require("../models/Registration");

/* ADD CLASS LEAD */

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


/* GET ALL LEADS */

exports.getClassLeads = async (req, res) => {
  try {
    const leads = await ClassLead.find().sort({ date: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json(err);
  }
};


/* UPDATE LEAD STATUS */

exports.updateClassLeadStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const lead = await ClassLead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    /* IMPORTANT LOGIC */

    if (status === "Completed" || status === "Enrolled") {

      const existing = await Registration.findOne({
        phone: lead.phone,
        course: lead.course
      });

      if (!existing) {

        const newRegistration = new Registration({
          name: lead.name,
          phone: lead.phone,
          category: lead.category,
          course: lead.course
        });

        await newRegistration.save();
      }
    }

    res.json({ message: "Status updated" });

  } catch (err) {
    res.status(500).json(err);
  }
};


/* DELETE LEAD */

exports.deleteClassLead = async (req, res) => {
  try {
    await ClassLead.findByIdAndDelete(req.params.id);
    res.json({ message: "Lead deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};


/* LEAD COUNT */

exports.getClassLeadCount = async (req, res) => {
  try {
    const count = await ClassLead.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json(err);
  }
};