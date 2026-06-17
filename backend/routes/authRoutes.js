const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  changePassword,
  forgotPassword,
} = require("../controllers/authController");

const verifyToken =
  require("../middleware/authMiddleware");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.put("/change-password",
  verifyToken,
  changePassword
);
router.put(
  "/forgot-password",
  forgotPassword
);
module.exports = router;