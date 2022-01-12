const router = require('express-promise-router')();
const productController = require('../controllers/product.controller');

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProduct);

module.exports = router;
