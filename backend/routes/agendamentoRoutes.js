const router      = require("express").Router();
const agendamento = require("../controllers/agendamentoController");
const authMW      = require("../middlewares/authMiddleware");
const adminMW     = require("../middlewares/adminMiddleware");

router.post("/",              authMW, agendamento.criarAgendamento);
router.get("/",               authMW, agendamento.listarAgendamentos);
router.patch("/:id/cancelar", authMW, adminMW, agendamento.cancelarAgendamento);

module.exports = router;