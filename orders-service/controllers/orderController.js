// controllers/orderController.js
const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).send(order);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send('Pedido no encontrado');
    }
    res.status(200).send(order);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.updateOrderById = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) {
      return res.status(404).send('Pedido no encontrado');
    }
    res.status(200).send(order);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteOrderById = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).send('Pedido no encontrado');
    }
    res.status(200).json({ message: 'Pedido eliminado correctamente' });
  } catch (err) {
    res.status(400).send(err);
  }
};