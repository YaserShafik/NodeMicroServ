// controllers/userController.js
const User = require('../models/User');
const { getOrdersByUserId } = require('../services/orderService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Password hashing
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create and save user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Login de usuario
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({email});
    if(!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send('Email o contraseña incorrectos');
    }

    // JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).send({ auth:true , token });
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
    const updateData = { ...req.body };

    // Si la contraseña está presente en los datos de actualización, hashearla
    if (updateData.password) {
      const salt = bcrypt.genSaltSync(10);
      updateData.password = bcrypt.hashSync(updateData.password, salt);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
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
      return res.status(404).send({error:'Usuario no encontrado'});
    }
    res.status(200).send({message:'Usuario eliminado correctamente'});
  } catch (err) {
    res.status(400).send(err);
  }
};
