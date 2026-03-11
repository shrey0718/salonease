const mongoose = require("mongoose");

const classLeadSchema = new mongoose.Schema({
  name: String,
  phone: String,
  course: String,
  category: String,   // 💄 Makeup / 💇 Hair / 💅 Nail / 🧴 Skin
  date: { type: Date, default: Date.now },
  status: { type: String, default: "Interested" }
});

module.exports = mongoose.model("ClassLead", classLeadSchema);
