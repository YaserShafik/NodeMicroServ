const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { connectRabbitMQ } = require('./rabbitmq');
const userRoutes = require('./routes/userRoutes');
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/users';

// Conectar a MongoDB Atlas
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

connectRabbitMQ();

// Usar las rutas de usuario
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
