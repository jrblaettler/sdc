const router = require('express-promise-router')();
const productController = require('../controllers/product.controller');

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProduct);
router.get('/products/:id/related', productController.getRelatedIds);
router.get('/products/:id/styles', productController.getStyles);

module.exports = router;
