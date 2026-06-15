const db = require("../config/db");

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

module.exports = {
  createStore,
};