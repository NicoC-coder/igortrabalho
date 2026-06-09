import { cadastrarAluno } from "../api/alunos.js";

const form = document.getElementById("formAluno");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const aluno = {
    nome: document.getElementById("nome").value,
    cpf: document.getElementById("cpf").value,
    nascimento: document.getElementById("nascimento").value,
    telefone: document.getElementById("telefone").value,
    email: document.getElementById("email").value
  };

  try {

    const resultado = await cadastrarAluno(aluno);

    alert("Aluno cadastrado com sucesso!");

    console.log(resultado);

    form.reset();

  } catch (erro) {

    alert("Erro ao cadastrar aluno");

    console.error(erro);

  }
});