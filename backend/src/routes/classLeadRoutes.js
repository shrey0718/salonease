const express = require("express");
const router = express.Router();

const {
  addClassLead,
  getClassLeads,
  updateClassLeadStatus,
  deleteClassLead,
  getClassLeadCount
} = require("../controllers/classLeadController");

router.post("/add", addClassLead);
router.get("/", getClassLeads);
router.get("/count", getClassLeadCount);
router.put("/:id", updateClassLeadStatus);
router.delete("/:id", deleteClassLead);

module.exports = router;
