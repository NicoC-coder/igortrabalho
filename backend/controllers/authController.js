const Usuario = require("../models/Usuario");
const bcrypt  = require("bcryptjs");
const jwt     = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { nome, email, senha, role } = req.body;
    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ erro: "E-mail já cadastrado" });
    const user = await Usuario.create({ nome, email, senha, role: role || "aluno" });
    const { senha: _, ...sem } = user.toObject();
    res.status(201).json(sem);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await Usuario.findOne({ email });
    if (!user) return res.status(401).json({ erro: "E-mail ou senha incorretos" });
    const ok = await bcrypt.compare(senha, user.senha);
    if (!ok) return res.status(401).json({ erro: "E-mail ou senha incorretos" });
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    const { senha: _, ...sem } = user.toObject();
    res.json({ token, user: sem });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await Usuario.findById(req.user.id).select("-senha");
    res.json(user);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};