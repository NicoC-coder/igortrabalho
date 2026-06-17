const router  = require("express").Router();
const aluno   = require("../controllers/alunoController");
const authMW  = require("../middlewares/authMiddleware");
const adminMW = require("../middlewares/adminMiddleware");

router.post("/",   authMW, adminMW, aluno.createAluno);
router.get("/",    authMW, aluno.getAlunos);
router.get("/:id", authMW, aluno.getAluno);
router.put("/:id", authMW, adminMW, aluno.atualizarAluno);

module.exports = router;