const express = require("express");
const router = express.Router();

const {
  addRegistration,
  getRegistrations,
  getRegistrationCount,
  updateRegistration,
  deleteRegistration
} = require("../controllers/registrationController");

router.post("/add", addRegistration);
router.get("/", getRegistrations);
router.get("/count", getRegistrationCount);
router.put("/:id", updateRegistration);
router.delete("/:id", deleteRegistration);

module.exports = router;
