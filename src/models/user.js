const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email:  String,
  nombre:  String
});

// Crear el modelo
const User = mongoose.model('User', userSchema);

module.exports = User;