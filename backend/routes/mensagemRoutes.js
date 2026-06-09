const express = require("express");

const router = express.Router();

const {
  listarMensagens
} = require("../controllers/mensagemController");

router.get("/", listarMensagens);

module.exports = router;