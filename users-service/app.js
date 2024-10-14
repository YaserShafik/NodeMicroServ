const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { connectRabbitMQ } = require('./rabbitmq');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/users';

// Configurar el motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Conectar a MongoDB Atlas
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

connectRabbitMQ();

// Usar las rutas de usuario
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
