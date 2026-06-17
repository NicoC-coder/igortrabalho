const Matricula = require("../models/Matricula");
const Aluno     = require("../models/Aluno");
const Curso     = require("../models/Curso");
const Mensagem  = require("../models/Mensagem");

exports.criarMatricula = async (req, res) => {
  try {
    const { aluno: alunoId, curso: cursoId } = req.body;

    const aluno = await Aluno.findById(alunoId);
    if (!aluno) return res.status(404).json({ erro: "Aluno não encontrado" });

    const curso = await Curso.findById(cursoId);
    if (!curso) return res.status(404).json({ erro: "Curso não encontrado" });

    // Verificar idade mínima
    const hoje = new Date();
    let idade = hoje.getFullYear() - new Date(aluno.nascimento).getFullYear();
    const m = hoje.getMonth() - new Date(aluno.nascimento).getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < new Date(aluno.nascimento).getDate())) idade--;
    if (idade < curso.idadeMinima) {
      return res.status(400).json({ erro: `Aluno precisa ter pelo menos ${curso.idadeMinima} anos` });
    }

    // Verificar duplicata
    const duplicada = await Matricula.findOne({ aluno: alunoId, curso: cursoId });
    if (duplicada) return res.status(400).json({ erro: "Aluno já está matriculado neste curso" });

    // Verificar vagas
    const matriculadas = await Matricula.countDocuments({ curso: cursoId, status: "ativa" });
    if (matriculadas >= curso.vagas) {
      return res.status(400).json({ erro: "Não há vagas disponíveis neste curso" });
    }

    const matricula = await Matricula.create({ aluno: alunoId, curso: cursoId });

    await Mensagem.create({
      aluno: alunoId,
      conteudo: `Sua matrícula no curso "${curso.nome}" foi realizada com sucesso!`,
      tipo: "matricula"
    });

    const populada = await matricula.populate(["aluno", "curso"]);
    res.status(201).json({ mensagem: "Matrícula realizada com sucesso", matricula: populada });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.listarMatriculas = async (req, res) => {
  try {
    const matriculas = await Matricula.find().populate("aluno").populate("curso");
    res.json(matriculas);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.cancelarMatricula = async (req, res) => {
  try {
    const matricula = await Matricula.findByIdAndUpdate(
      req.params.id, { status: "cancelada" }, { new: true }
    );
    if (!matricula) return res.status(404).json({ erro: "Matrícula não encontrada" });

    await Mensagem.create({
      aluno: matricula.aluno,
      conteudo: "Sua matrícula foi cancelada.",
      tipo: "cancelamento"
    });

    res.json({ mensagem: "Matrícula cancelada", matricula });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};