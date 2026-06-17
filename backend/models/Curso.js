const mongoose = require("mongoose");

const CursoSchema = new mongoose.Schema({
  nome:        { type: String, required: true },
  descricao:   { type: Number, default: "" },
  duracao:     { type: String, default: "" },
  vagas:       { type: Number, default: 30 },
  idadeMinima: { type: Number, default: 14 },
  ativo:       { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Curso", CursoSchema);
