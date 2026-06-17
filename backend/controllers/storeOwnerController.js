const db = require("../config/db");

const getOwnerDashboard = (req, res) => {
  const ownerId = req.user.id;

  const storeSql =
    "SELECT * FROM stores WHERE owner_id = ?";

  db.query(
    storeSql,
    [ownerId],
    (err, storeResult) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (storeResult.length === 0) {
        return res.status(404).json({
          message: "No Store Assigned",
        });
      }

      const store = storeResult[0];

      const avgSql = `
        SELECT
        ROUND(AVG(rating),1) AS average_rating
        FROM ratings
        WHERE store_id = ?
      `;

      db.query(
        avgSql,
        [store.id],
        (err, avgResult) => {
          if (err) {
            return res.status(500).json(err);
          }

          const usersSql = `
            SELECT
            u.name,
            u.email,
            r.rating
            FROM ratings r
            JOIN users u
            ON r.user_id = u.id
            WHERE r.store_id = ?
          `;

          db.query(
            usersSql,
            [store.id],
            (err, usersResult) => {
              if (err) {
                return res.status(500).json(err);
              }

              res.status(200).json({
                storeName: store.name,
                averageRating:
                  avgResult[0].average_rating,
                users: usersResult,
              });
            }
          );
        }
      );
    }
  );
};

module.exports = {
  getOwnerDashboard,
};