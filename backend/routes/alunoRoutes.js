const router = require("express").Router();
const aluno = require("../controllers/alunoController");

router.post("/", aluno.createAluno);
router.get("/", aluno.getAlunos);

module.exports = router;