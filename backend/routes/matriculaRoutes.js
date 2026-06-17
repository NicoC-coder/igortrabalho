const router    = require("express").Router();
const matricula = require("../controllers/matriculaController");
const authMW    = require("../middlewares/authMiddleware");
const adminMW   = require("../middlewares/adminMiddleware");

router.post("/",              authMW, adminMW, matricula.criarMatricula);
router.get("/",               authMW, matricula.listarMatriculas);
router.patch("/:id/cancelar", authMW, adminMW, matricula.cancelarMatricula);

module.exports = router;