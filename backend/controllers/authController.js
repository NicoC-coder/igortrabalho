const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;

  const existe = await Usuario.findOne({ email });
  if (existe) return res.json({ msg: "Email já existe" });

  const user = await Usuario.create({ nome, email, senha });

  res.json(user);
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  const user = await Usuario.findOne({ email });
  if (!user) return res.json({ msg: "Usuário não existe" });

  const ok = await bcrypt.compare(senha, user.senha);
  if (!ok) return res.json({ msg: "Senha errada" });

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, user });
};