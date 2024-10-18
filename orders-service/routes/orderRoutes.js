// routes/orderRoutes.js
const express = require('express');
const orderController = require('../controllers/orderController');

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
router.post('/create', orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post('/update/:id', orderController.updateOrderById);
router.post('/delete/:id', orderController.deleteOrderById);

module.exports = router;