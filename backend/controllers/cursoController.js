const Curso = require("../models/Curso");

exports.listarCursos = async (req, res) => {
  try {
    const cursos = await Curso.find({ ativo: true });
    res.json(cursos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.criaCurso = async (req, res) => {
  try {
    const curso = await Curso.create(req.body);
    res.status(201).json(curso);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.atualizaCurso = async (req, res) => {
  try {
    const curso = await Curso.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!curso) return res.status(404).json({ erro: "Curso não encontrado" });
    res.json(curso);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.deletaCurso = async (req, res) => {
  try {
    await Curso.findByIdAndUpdate(req.params.id, { ativo: false });
    res.json({ msg: "Curso desativado" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
