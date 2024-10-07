const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { connectRabbitMQ, sendMessageToQueue } = require('./rabbitmq');
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/users';

// Conectar a MongoDB Atlas
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

connectRabbitMQ();

// Definir modelo de Usuario
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);


// Ruta para registrar un usuario
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send({ message: 'Usuario no encontrado' });
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send({ message: 'Usuario no encontrado' });
    } else {
      user.name = name;
      user.email = email;
      user.password = password;
      await user.save();
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndRemove(id);
    if (!user) {
      res.status(404).send({ message: 'Usuario no encontrado' });
    } else {
      res.status(200).send({ message: 'Usuario eliminado' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});



app.listen(PORT, () => {
  console.log(`Users service running on port ${PORT}`);
});
