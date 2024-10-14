const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
