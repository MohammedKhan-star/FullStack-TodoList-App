const express = require('express');
const router = express.Router();
const { getProducts, createProduct } = require('../controllers/productController');

router.get('/', getProducts);
router.post('/', createProduct); // You can protect this with admin auth later

module.exports = router;