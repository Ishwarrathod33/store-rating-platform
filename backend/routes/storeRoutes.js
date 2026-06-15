const express = require("express");
const router = express.Router();

const {
  createStore,
  getAllStores,
  getStoreRatings,
} = require("../controllers/storeController");

const verifyToken = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// GET ALL STORES
router.get("/", getAllStores);

// GET STORE AVERAGE RATING
router.get("/:id/ratings", getStoreRatings);

// CREATE STORE (ADMIN ONLY)
router.post(
  "/",
  verifyToken,
  adminMiddleware,
  createStore
);

module.exports = router;