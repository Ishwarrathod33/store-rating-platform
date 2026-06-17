const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users(name,email,password,address,role) VALUES(?,?,?,?,?)";

    db.query(
      sql,
      [name, email, hashedPassword, address, "user"],
      (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.status(201).json({
          message: "User Registered Successfully",
        });
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

// LOGIN USER
const loginUser = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = results[0];

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      message: "Login Successful",
      token,
      role: user.role,
    });
  });
};
// CHANGE PASSWORD
const changePassword = (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const userId = req.user.id;

  const sql = "SELECT * FROM users WHERE id = ?";

  db.query(sql, [userId], async (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    const user = results[0];

    const match = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!match) {
      return res.status(400).json({
        message: "Current Password Incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    db.query(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashedPassword, userId],
      (err) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.status(200).json({
          message:
            "Password Changed Successfully",
        });
      }
    );
  });
};
module.exports = {
  registerUser,
  loginUser,
  changePassword,
};