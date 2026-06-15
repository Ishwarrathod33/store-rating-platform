const express = require("express");
const router = express.Router();

const {
  addRating,
  updateRating,
} = require("../controllers/ratingController");

const verifyToken =
  require("../middleware/authMiddleware");

// ADD RATING
router.post(
  "/",
  verifyToken,
  addRating
);

// UPDATE RATING
router.put(
  "/:id",
  verifyToken,
  updateRating
);

module.exports = router;