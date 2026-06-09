import { login } from "../api/auth.js";

window.handleLogin = async function () {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const data = await login(email, senha);

  if (data.token) {
    alert("Login OK");

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    window.location.href = "../pages/dashboard.html";
  } else {
    alert(data.message || "Erro no login");
  }
};