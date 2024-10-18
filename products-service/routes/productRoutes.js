// routes/productRoutes.js
const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// Rutas para las vistas
router.get('/create', (req, res) => {
  res.render('create');
});
router.get('/update', (req, res) => {
  res.render('update');
});
router.get('/delete', (req, res) => {
  res.render('delete');
});

// Rutas para las acciones
router.post('/create', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/update/:id', productController.updateProductById);
router.post('/delete/:id', productController.deleteProductById);

module.exports = router;