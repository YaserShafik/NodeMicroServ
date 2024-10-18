const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const {connectRabittMQ_Products, getMessageFromQueue} = require('./orders_queue')
dotenv.config();

const app = express();


const PORT = process.env.PORT || 4001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/products';

// Conectar a MongoDB Atlas
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado a MongoDB Atlas (Products)'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

connectRabittMQ_Products(() => {
  getMessageFromQueue();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes);


app.listen(PORT, () => {
  console.log(`Products service running on port ${PORT}`);
});
