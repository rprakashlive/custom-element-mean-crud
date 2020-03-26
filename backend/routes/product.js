var express = require('express');
var router = express.Router();
var productCtrl = require('../controllers/productCtrl');
router.get('/', productCtrl.getProducts);
router.post('/create', productCtrl.createProduct);

module.exports = router;