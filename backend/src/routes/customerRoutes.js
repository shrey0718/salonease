const express = require("express");
const router = express.Router();

const {
  addCustomer,
  getCustomers,
  getCustomerCount,
  updateCustomer,
  deleteCustomer
} = require("../controllers/customerController");


/* GET ALL CUSTOMERS */
router.get("/", getCustomers);


/* CUSTOMER COUNT (DASHBOARD) */
router.get("/count", getCustomerCount);


/* ADD CUSTOMER */
router.post("/add", addCustomer);


/* UPDATE CUSTOMER */
router.put("/:id", updateCustomer);


/* DELETE CUSTOMER */
router.delete("/:id", deleteCustomer);


module.exports = router;