import { exibirUsuarioAutenticado } from "../services/usuarioUi.js";

document.addEventListener("DOMContentLoaded", () => {
    exibirUsuarioAutenticado();

    const formBusca = document.getElementById("FormBusca");
    if (!formBusca) {
        return;
    }

    formBusca.addEventListener("submit", (event) => {
        event.preventDefault();

        const filtros = {
            codigo: document.getElementById("codigo")?.value.trim().toLowerCase() || "",
            razaoSocial: document.getElementById("razaoSocial")?.value.trim().toLowerCase() || "",
            nomeFantasia: document.getElementById("nomeFantasia")?.value.trim().toLowerCase() || "",
            cnpj: document.getElementById("CNPJ")?.value.trim() || "",
            cidade: document.getElementById("cidade")?.value.trim().toLowerCase() || "",
            estado: document.getElementById("estado")?.value || "",
            status: document.getElementById("status")?.value || "todos"
        };

        localStorage.setItem("filtrosFornecedor", JSON.stringify(filtros));
        localStorage.setItem("consultaRealizada", "true");
        localStorage.setItem("filtrosCongelados", JSON.stringify(filtros));

        window.location.href = "ResultadoBusca.html";
    });
});