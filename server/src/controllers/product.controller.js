const db = require('../config/database');

const handleRes = res => (err, data) => {
  err ? res.send(err) : res.send(data.rows);
};

exports.getAllProducts = (req, res) => {
  db.query(
    'SELECT * FROM public."Products" ORDER BY id ASC LIMIT $1',
    [req.params.count || 5],
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
  db.query(
    `SELECT array_agg(related_product_id) related FROM public."Related" WHERE current_product_id = $1`,
    [req.params.id],
    handleRes(res)
  );
};

exports.getStyles = (req, res) => {
  db.query(
    `SELECT s.*,
    json_agg(DISTINCT jsonb_build_object('thumbnail_url', p.thumbnail_url, 'url', p.url)) as photos,
    jsonb_object_agg(DISTINCT sk.id, jsonb_build_object('quantity', sk.quantity, 'size', sk.size)) as skus
    FROM public."Styles" as s
    LEFT JOIN public."Photos" as p ON p."styleId" = s.id
    LEFT JOIN public."Skus" as sk ON sk."styleId" = s.id
    WHERE s."productId" = $1
    GROUP BY s.id`,
    [req.params.id],
    handleRes(res)
  );
};
