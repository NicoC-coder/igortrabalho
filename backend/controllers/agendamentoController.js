const Agendamento = require("../models/Agendamento");
const Mensagem    = require("../models/Mensagem");

exports.criarAgendamento = async (req, res) => {
  try {
    const { aluno, curso, data, hora, tipo } = req.body;

    const conflito = await Agendamento.findOne({ aluno, data, hora, status: { $ne: "cancelado" } });
    if (conflito) return res.status(400).json({ erro: "Aluno já tem agendamento neste horário" });

    const agendamento = await Agendamento.create({ aluno, curso, data, hora, tipo });

    await Mensagem.create({
      aluno,
      conteudo: `Seu agendamento foi confirmado para ${new Date(data).toLocaleDateString("pt-BR")} às ${hora}.`,
      tipo: "agendamento"
    });

    const populado = await agendamento.populate(["aluno", "curso"]);
    res.status(201).json({ mensagem: "Agendamento criado com sucesso", agendamento: populado });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.listarAgendamentos = async (req, res) => {
  try {
    const agendamentos = await Agendamento.find()
      .populate("aluno")
      .populate("curso")
      .sort({ data: 1, hora: 1 });
    res.json(agendamentos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.cancelarAgendamento = async (req, res) => {
  try {
    const ag = await Agendamento.findByIdAndUpdate(
      req.params.id, { status: "cancelado" }, { new: true }
    );
    if (!ag) return res.status(404).json({ erro: "Agendamento não encontrado" });
    res.json({ mensagem: "Agendamento cancelado", agendamento: ag });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};