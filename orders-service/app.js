const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const {connectRabbitMQ, sendMessageToQueue} = require('./rabittmq')
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4002;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/orders';

// Conectar a MongoDB Atlas
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado a MongoDB Atlas (Orders)'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

connectRabbitMQ();

// Definir esquema de pedido
const orderSchema = new mongoose.Schema({
  productId: String,
  quantity: Number,
  totalPrice: Number,
  orderDate: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// Ruta para crear un pedido
app.post('/orders', async (req, res) => {
  const { productId, quantity, totalPrice } = req.body;

  try {
    const order = new Order({ productId, quantity, totalPrice });
    await order.save();

    // Enviar mensaje a RabbitMQ
    const message = JSON.stringify({ orderId: order._id, productId, quantity, totalPrice });
    sendMessageToQueue(message);

    res.status(201).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Ruta para obtener todos los pedidos
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Ruta para obtener un pedido por ID
app.get('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send('Pedido no encontrado');
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Ruta para actualizar un pedido por ID
app.put('/orders/:id', async (req, res) => {
  try {
    const { productId, quantity, totalPrice } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { productId, quantity, totalPrice },
      { new: true }
    );
    if (!order) return res.status(404).send('Pedido no encontrado');
    res.status(200).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Ruta para eliminar un pedido por ID
app.delete('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).send('Pedido no encontrado');
    res.status(200).send('Pedido eliminado');
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Orders service running on port ${PORT}`);
});
