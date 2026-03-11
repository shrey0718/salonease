const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

/* ROUTES */
const productRoutes = require("./src/routes/productRoutes");
const customerRoutes = require("./src/routes/customerRoutes");
const registrationRoutes = require("./src/routes/registrationRoutes");
const productLeadRoutes = require("./src/routes/productLeadRoutes");
const classLeadRoutes = require("./src/routes/classLeadRoutes");
const reviewRoutes = require("./src/routes/reviewRoutes");
const staffRoutes = require("./src/routes/staffRoutes");
const authRoutes = require("./src/routes/authRoutes"); // ← ADD BACK

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* ROUTES */
app.use("/products", productRoutes);
app.use("/customers", customerRoutes);
app.use("/registrations", registrationRoutes);
app.use("/product-leads", productLeadRoutes);
app.use("/class-leads", classLeadRoutes);
app.use("/reviews", reviewRoutes);
app.use("/staff", staffRoutes);
app.use("/auth", authRoutes); // ← IMPORTANT

/* DATABASE */
mongoose
  .connect("mongodb+srv://shreyald69_db_user:3jZQ4v2rKNL8lDr8@saloneasecluster.lqy4k0o.mongodb.net/salonease")
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.log("DB Error:", err));

/* SERVER */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});