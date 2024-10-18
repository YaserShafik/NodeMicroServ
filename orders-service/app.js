const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const {connectRabbitMQ, sendMessageToQueue} = require('./rabittmq')
dotenv.config();

const app = express();

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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const orderRoutes = require('./routes/orderRoutes');
app.use('/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`Orders service running on port ${PORT}`);
});
