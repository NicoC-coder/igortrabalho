const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const alunoRoutes = require("./routes/alunoRoutes");
const matriculaRoutes = require("./routes/matriculaRoutes");
const mensagemRoutes = require("./routes/mensagemRoutes"); // NOVO

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/alunos", alunoRoutes);
app.use("/api/matriculas", matriculaRoutes);
app.use("/api/mensagens", mensagemRoutes); // NOVO

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});