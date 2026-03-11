const express = require("express");
const router = express.Router();

const {
  addProductLead,
  getProductLeads,
  updateLeadStatus,
  deleteLead,
  getLeadCount,
  createOrderLead   // ⭐ NEW
} = require("../controllers/productLeadController");

router.post("/add", addProductLead);

router.get("/", getProductLeads);

router.get("/count", getLeadCount);

router.put("/:id", updateLeadStatus);

router.delete("/:id", deleteLead);

// ⭐ NEW ROUTE FOR RAZORPAY ORDERS
router.post("/order", createOrderLead);

module.exports = router;