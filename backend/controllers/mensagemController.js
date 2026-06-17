const Mensagem = require("../models/Mensagem");

exports.listarMensagens = async (req, res) => {
  try {
    const mensagens = await Mensagem.find().populate("aluno").sort({ dataEnvio: -1 });
    res.json(mensagens);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.mensagensPorAluno = async (req, res) => {
  try {
    const mensagens = await Mensagem.find({ aluno: req.params.alunoId }).sort({ dataEnvio: -1 });
    res.json(mensagens);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};