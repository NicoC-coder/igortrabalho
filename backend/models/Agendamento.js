const mongoose = require("mongoose");

const AgendamentoSchema = new mongoose.Schema({
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
  data:   { type: Date, required: true },
  hora:   { type: String, required: true },
  tipo:   { type: String, default: "orientacao" },
  status: { type: String, default: "pendente" }
}, { timestamps: true });

module.exports = mongoose.model("Agendamento", AgendamentoSchema);