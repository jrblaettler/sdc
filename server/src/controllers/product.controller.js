const db = require('../config/database');

const handleRes = res => (err, data) => {
  err ? res.send(err) : res.send(data.rows);
};

exports.getAllProducts = (req, res) => {
  db.query(
    'SELECT * FROM public."Products" ORDER BY id ASC LIMIT 100',
    handleRes(res)
  );
};

exports.getProduct = (req, res) => {
  const id = req.params.id;
  db.query(
    'SELECT * FROM public."Products" WHERE id = $1',
    [id],
    handleRes(res)
  );
};
