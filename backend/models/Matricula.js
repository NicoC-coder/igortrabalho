const mongoose = require("mongoose");

const matriculaSchema = new mongoose.Schema({
  aluno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Aluno",
    required: true
  },

  curso: {
    type: String,
    required: true
  },

  dataMatricula: {
    type: Date,
    default: Date.now
  },

  status: {
    type: String,
    default: "ativa"
  }
});

module.exports = mongoose.model("Matricula", matriculaSchema);