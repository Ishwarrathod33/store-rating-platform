const express = require("express");
const router = express.Router();

const {
  addRating,
  updateRating,
  getMyRatings,
} = require("../controllers/ratingController");

const verifyToken =
  require("../middleware/authMiddleware");

router.post("/", verifyToken, addRating);

router.put("/:id", verifyToken, updateRating);

router.get(
  "/my-ratings",
  verifyToken,
  getMyRatings
);

module.exports = router;