const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, require: true },
  nombre: { type: String, require: true }
}, {
  timestamps: true
});

userSchema.pre('save', async (next) => {
  const user = this;
  if (user.isModified("email") || user.isModified("nombre"))
  {
    user.is_read = false;
  }
  next();
});

// Crear el modelo
module.exports = mongoose.model('User', userSchema);