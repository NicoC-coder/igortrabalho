const express = require("express");
const router = express.Router();

const {
  criarMatricula,
  listarMatriculas
} = require("../controllers/matriculaController");

router.post("/", criarMatricula);

router.get("/", listarMatriculas);

module.exports = router;