const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getAllUsers,
  addUser,
} = require("../controllers/adminController");

const verifyToken =
  require("../middleware/authMiddleware");

const adminMiddleware =
  require("../middleware/adminMiddleware");

// DASHBOARD
router.get(
  "/dashboard",
  verifyToken,
  adminMiddleware,
  getDashboardStats
);

// USERS
router.get(
  "/users",
  verifyToken,
  adminMiddleware,
  getAllUsers
);
router.post(
  "/users",
  verifyToken,
  adminMiddleware,
  addUser
);

module.exports = router;