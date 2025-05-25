// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require("../controllers/productControllers")


router.get('/', productController.getAllProducts);

router.get('/home', productController.getHomePageData);

router.get('/new', productController.getNewProducts);

router.get('/bestsellers', productController.getBestSellerProducts);

router.get('/discount', productController.getDiscountProducts);

router.get('/category/:category', productController.getProductsByCategory);

router.get('/category/:category/discount', productController.getCategoryDiscountProducts);

router.get('/:id', productController.getProductById);

module.exports = router;