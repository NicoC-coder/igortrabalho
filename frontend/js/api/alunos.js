const API = "http://localhost:3000/api";

export async function criarAluno(aluno) {
  const res = await fetch(`${API}/alunos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(aluno)
  });

  return res.json();
}

export async function listarAlunos() {
  const res = await fetch(`${API}/alunos`);
  return res.json();
}