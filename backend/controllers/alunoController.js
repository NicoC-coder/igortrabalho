const Aluno = require("../models/Aluno");

exports.createAluno = async (req, res) => {
  const { nome, cpf, nascimento, telefone, email } = req.body;

  const existe = await Aluno.findOne({ cpf });
  if (existe) return res.json({ msg: "CPF já existe" });

  const idade =
    new Date().getFullYear() - new Date(nascimento).getFullYear();

  if (idade < 14) return res.json({ msg: "Menor de 14 anos" });

  const aluno = await Aluno.create({
    nome,
    cpf,
    nascimento,
    telefone,
    email
  });

  res.json(aluno);
};

exports.getAlunos = async (req, res) => {
  const alunos = await Aluno.find();
  res.json(alunos);
};