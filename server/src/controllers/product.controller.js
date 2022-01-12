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
  db.query(
    `SELECT p.*,  json_agg(json_build_object('feature', f.feature, 'value', f.value)) as features
    FROM public."Products" as p
    LEFT JOIN public."Features" as f ON f.product_id = p.id
    WHERE p.id = $1
    GROUP BY p.id`,
    [req.params.id],
    handleRes(res)
  );
};

exports.getRelatedIds = (req, res) => {
  console.log(req.params.id);
  db.query(
    `SELECT array_agg(related_product_id) related FROM public."Related" WHERE current_product_id = $1`,
    [req.params.id],
    handleRes(res)
  );
};
