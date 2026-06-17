const db = require("../config/db");

// DASHBOARD STATS
const getDashboardStats = (req, res) => {
  const dashboardData = {};

  db.query(
    "SELECT COUNT(*) AS totalUsers FROM users",
    (err, usersResult) => {
      if (err) {
        return res.status(500).json(err);
      }

      dashboardData.totalUsers =
        usersResult[0].totalUsers;

      db.query(
        "SELECT COUNT(*) AS totalStores FROM stores",
        (err, storesResult) => {
          if (err) {
            return res.status(500).json(err);
          }

          dashboardData.totalStores =
            storesResult[0].totalStores;

          db.query(
            "SELECT COUNT(*) AS totalRatings FROM ratings",
            (err, ratingsResult) => {
              if (err) {
                return res.status(500).json(err);
              }

              dashboardData.totalRatings =
                ratingsResult[0].totalRatings;

              res.status(200).json(
                dashboardData
              );
            }
          );
        }
      );
    }
  );
};

// GET ALL USERS
const getAllUsers = (req, res) => {
  const sql = `
    SELECT
      id,
      name,
      email,
      address,
      role,
      created_at
    FROM users
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(results);
  });
};

module.exports = {
  getDashboardStats,
  getAllUsers,
};