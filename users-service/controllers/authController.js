const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
      return res.status(401).send('Email o contraseña incorrectos');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).send({ auth: true, token });
  } catch (err) {
    res.status(400).send(err);
  }
};