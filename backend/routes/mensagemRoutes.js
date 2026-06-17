const router   = require("express").Router();
const mensagem = require("../controllers/mensagemController");
const authMW   = require("../middlewares/authMiddleware");

router.get("/",                authMW, mensagem.listarMensagens);
router.get("/aluno/:alunoId",  authMW, mensagem.mensagensPorAluno);

module.exports = router;