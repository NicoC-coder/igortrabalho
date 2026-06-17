const mongoose = require("mongoose");

const MatriculaSchema = new mongoose.Schema({
  aluno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Aluno",
    required: true
  },
  curso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Curso",
    required: true
  },
  status:        { type: String, default: "ativa" },
  dataMatricula: { type: Date, default: Date.now }
}, { timestamps: true });

MatriculaSchema.index({ aluno: 1, curso: 1 }, { unique: true });

module.exports = mongoose.model("Matricula", MatriculaSchema);