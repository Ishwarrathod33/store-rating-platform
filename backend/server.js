require("dotenv").config();
require("./config/db");
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const app = express();
const storeRoutes = require("./routes/storeRoutes");
const ratingRoutes= require("./routes/ratingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const storeOwnerRoutes = require("./routes/storeOwnerRoutes");
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/store-owner", storeOwnerRoutes);
app.get("/", (req, res) => {
  res.send("Store Rating API Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});