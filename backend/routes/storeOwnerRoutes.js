const express = require("express");
const router = express.Router();

const verifyToken =
  require("../middleware/authMiddleware");

const {
  getOwnerDashboard,
} = require("../controllers/storeOwnerController");

router.get(
  "/dashboard",
  verifyToken,
  getOwnerDashboard
);

module.exports = router;