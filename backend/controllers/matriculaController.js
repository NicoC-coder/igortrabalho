const Matricula = require("../models/Matricula");
const Mensagem = require("../models/Mensagem");

exports.criarMatricula = async (req, res) => {
  try {
    const { aluno, curso } = req.body;

    const matricula = await Matricula.create({
      aluno,
      curso
    });

    await Mensagem.create({
      aluno,
      conteudo: `Sua matrícula no curso ${curso} foi realizada com sucesso.`,
      tipo: "matricula"
    });

    res.status(201).json({
      mensagem: "Matrícula realizada com sucesso",
      matricula
    });

  } catch (erro) {
    res.status(500).json({
      erro: erro.message
    });
  }
};

exports.listarMatriculas = async (req, res) => {
  try {

    const matriculas = await Matricula.find()
      .populate("aluno");

    res.json(matriculas);

  } catch (erro) {
    res.status(500).json({
      erro: erro.message
    });
  }
};