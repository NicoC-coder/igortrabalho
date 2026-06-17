const express = require("express");
const cors    = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes        = require("./routes/authRoutes");
const alunoRoutes       = require("./routes/alunoRoutes");
const cursoRoutes       = require("./routes/cursoRoutes");
const matriculaRoutes   = require("./routes/matriculaRoutes");
const agendamentoRoutes = require("./routes/agendamentoRoutes");
const mensagemRoutes    = require("./routes/mensagemRoutes");

const app = express();

connectDB();

app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","PATCH","DELETE"],
  allowedHeaders: ["Content-Type","Authorization"]
}));
app.use(express.json());

app.use("/api/auth",         authRoutes);
app.use("/api/alunos",       alunoRoutes);
app.use("/api/cursos",       cursoRoutes);
app.use("/api/matriculas",   matriculaRoutes);
app.use("/api/agendamentos", agendamentoRoutes);
app.use("/api/mensagens",    mensagemRoutes);

app.get("/api/health", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));