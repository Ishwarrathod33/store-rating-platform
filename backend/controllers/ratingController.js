const db = require("../config/db");

// ADD OR UPDATE RATING
const addRating = (req, res) => {
  const { store_id, rating } = req.body;

  const user_id = req.user.id;

  const checkSql =
    "SELECT * FROM ratings WHERE user_id = ? AND store_id = ?";

  db.query(
    checkSql,
    [user_id, store_id],
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      // Rating already exists
      if (results.length > 0) {
        const updateSql =
          "UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?";

        db.query(
          updateSql,
          [rating, user_id, store_id],
          (err) => {
            if (err) {
              return res.status(500).json(err);
            }

            return res.status(200).json({
              message: "Rating Updated Successfully",
            });
          }
        );
      } else {
        // New Rating
        const insertSql =
          "INSERT INTO ratings(user_id, store_id, rating) VALUES(?,?,?)";

        db.query(
          insertSql,
          [user_id, store_id, rating],
          (err) => {
            if (err) {
              return res.status(500).json(err);
            }

            return res.status(201).json({
              message: "Rating Added Successfully",
            });
          }
        );
      }
    }
  );
};

// UPDATE RATING BY ID
const updateRating = (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;

  const sql =
    "UPDATE ratings SET rating = ? WHERE id = ?";

  db.query(
    sql,
    [rating, id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(200).json({
        message: "Rating Updated Successfully",
      });
    }
  );
};

module.exports = {
  addRating,
  updateRating,
};