const db = require("../config/db");

// CREATE STORE
const createStore = (req, res) => {
  const { name, email, address, owner_id } = req.body;

  const sql =
    "INSERT INTO stores(name,email,address,owner_id) VALUES(?,?,?,?)";

  db.query(
    sql,
    [name, email, address, owner_id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Store Created Successfully",
      });
    }
  );
};

// GET ALL STORES
const getAllStores = (req, res) => {
  const sql = "SELECT * FROM stores";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(results);
  });
};

// GET STORE RATINGS
const getStoreRatings = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT 
      s.id,
      s.name,
      ROUND(AVG(r.rating), 1) AS average_rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    WHERE s.id = ?
    GROUP BY s.id
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(results);
  });
};

module.exports = {
  createStore,
  getAllStores,
  getStoreRatings,
};