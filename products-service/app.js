const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4001;
const MONGODB_URI = process.env.MONGODB_URI;

// Conectar a MongoDB Atlas
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB Atlas (Products)'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

connectRabbitMQ_Products(() => {
  getMessageFromQueue();
});

// Definir esquema de producto
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  stock: Number
});

const Product = mongoose.model('Product', productSchema);

// Ruta para crear un producto
app.post('/products', async (req, res) => {
  const { name, price, description, stock } = req.body;
  try {
    const product = new Product({ name, price, description, stock });
    await product.save();

    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});


// Ruta para obtener todos los productos
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();

    //Get message from RabbitMQ
    

    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Ruta para obtener un producto por ID
app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Producto no encontrado');
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Ruta para actualizar un producto por ID
app.put('/products/:id', async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, stock },
      { new: true }
    );
    if (!product) return res.status(404).send('Producto no encontrado');
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Ruta para eliminar un producto por ID
app.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send('Producto no encontrado');
    res.status(200).send('Producto eliminado');
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Products service running on port ${PORT}`);
});
