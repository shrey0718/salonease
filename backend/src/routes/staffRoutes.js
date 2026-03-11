const express = require("express");
const router = express.Router();

const {
  addStaff,
  getStaff,
  getStaffCount,
  updateStaff,
  deleteStaff
} = require("../controllers/staffController");

router.post("/add", addStaff);

router.get("/", getStaff);

router.get("/count", getStaffCount);

router.put("/:id", updateStaff);

router.delete("/:id", deleteStaff);

module.exports = router;