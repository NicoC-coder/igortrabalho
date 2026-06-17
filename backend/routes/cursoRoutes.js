const router  = require("express").Router();
const curso   = require("../controllers/cursoController");
const authMW  = require("../middlewares/authMiddleware");
const adminMW = require("../middlewares/adminMiddleware");

router.get("/",       authMW, curso.listarCursos);
router.post("/",      authMW, adminMW, curso.criarCurso);
router.put("/:id",    authMW, adminMW, curso.atualizarCurso);
router.delete("/:id", authMW, adminMW, curso.deletarCurso);

module.exports = router;