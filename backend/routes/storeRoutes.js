const express = require("express");
const router = express.Router();

const { createStore } = require("../controllers/storeController");

const verifyToken = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post(
  "/",
  verifyToken,
  adminMiddleware,
  createStore
);

module.exports = router;