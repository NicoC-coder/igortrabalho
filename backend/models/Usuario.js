const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UsuarioSchema = new mongoose.Schema({
  nome: String,
  email: { type: String, unique: true },
  senha: String,
  role: { type: String, default: "aluno" }
});

UsuarioSchema.pre("save", async function () {
  this.senha = await bcrypt.hash(this.senha, 10);
});

module.exports = mongoose.model("Usuario", UsuarioSchema);