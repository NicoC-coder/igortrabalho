const mongoose = require("mongoose");

const AlunoSchema = new mongoose.Schema({
  nome: String,
  cpf: { type: String, unique: true },
  nascimento: Date,
  telefone: String,
  email: String
});

module.exports = mongoose.model("Aluno", AlunoSchema);