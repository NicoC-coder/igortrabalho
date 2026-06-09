const mongoose = require("mongoose");

const MensagemSchema = new mongoose.Schema({
  aluno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Aluno",
    required: true
  },

  conteudo: {
    type: String,
    required: true
  },

  tipo: {
    type: String,
    default: "matricula"
  },

  dataEnvio: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Mensagem", MensagemSchema);