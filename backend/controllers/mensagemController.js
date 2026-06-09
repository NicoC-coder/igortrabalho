const Mensagem = require("../models/Mensagem");

exports.listarMensagens = async (req, res) => {
  try {

    const mensagens = await Mensagem.find()
      .populate("aluno");

    res.json(mensagens);

  } catch (erro) {

    res.status(500).json({
      erro: erro.message
    });

  }
};