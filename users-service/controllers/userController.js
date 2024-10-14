// controllers/userController.js
const User = require('../models/User');
const { getOrdersByUserId } = require('../services/orderService');

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Login de usuario
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Obtener un usuario por ID y sus pedidos
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }
    const orders = await getOrdersByUserId(req.params.id);
    res.status(200).send({ user, orders });
  } catch (err) {
    res.status(400).send(err);
  }
};

// Actualizar un usuario por ID
exports.updateUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Eliminar un usuario por ID
exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.status(200).send('Usuario eliminado');
  } catch (err) {
    res.status(400).send(err);
  }
};
