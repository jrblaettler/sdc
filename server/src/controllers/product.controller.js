const db = require('../config/database');

exports.getProducts = (req, res) => {
  db.query(
    'SELECT * FROM public."Products" ORDER BY id ASC LIMIT 100',
    (err, data) => {
      err ? res.send(err) : res.send(data.rows);
    }
  );
};
