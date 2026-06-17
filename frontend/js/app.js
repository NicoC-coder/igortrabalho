async function cadastrar() {
  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const nascimento = document.getElementById("nascimento").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;

  const res = await fetch("https://escola-tecnica-backend.onrender.com/api/alunos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nome,
      cpf,
      nascimento,
      telefone,
      email
    })
  });

  const data = await res.json();

  if (data._id) {
    alert("Aluno cadastrado!");
  } else {
    alert("Erro ao cadastrar");
  }
}