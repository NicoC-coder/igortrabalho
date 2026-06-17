const Aluno = require("..\models\Aluno");

exports.createAluno = async (req, res) => {
  try {
    const { nome, cpf, nascimento, telefone, email } = req.body;

    const existe = await Aluno.findOne({ cpf });
    if (existe) return res.status(400).json({ erro: "CPF já cadastrado" });

    const hoje = new Date();
    let idade = hoje.getFullYear() - new Date(nascimento).getFullYear();
    const m = hoje.getMonth() - new Date(nascimento).getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < new Date(nascimento).getDate())) idade--;
    if (idade < 14) return res.status(400).json({ erro: "Aluno deve ter pelo menos 14 anos" });

    const aluno = await Aluno.create({ nome, cpf, nascimento, telefone, email });
    res.status(201).json(aluno);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.getAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.find().sort({ nome: 1 });
    res.json(alunos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.getAluno = async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) return res.status(404).json({ erro: "Aluno não encontrado" });
    res.json(aluno);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.atualizarAluno = async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!aluno) return res.status(404).json({ erro: "Aluno não encontrado" });
    res.json(aluno);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
