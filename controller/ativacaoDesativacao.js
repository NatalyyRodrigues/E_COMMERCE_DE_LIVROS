const modoTela = localStorage.getItem("modoTela");

const fornecedorSelecionado = JSON.parse(
    localStorage.getItem("fornecedorSelecionado")
);

const tituloTela = document.getElementById("tituloTela");
const formStatusFornecedor = document.getElementById("formStatusFornecedor");
const btnCancelar = document.getElementById("btnCancelar");

function configurarTela() {

    if (modoTela === "inativar") {

        tituloTela.textContent = "Inativar Fornecedor";

    } else if (modoTela === "ativar") {

        tituloTela.textContent = "Ativar Fornecedor";

    }

}

btnCancelar.addEventListener("click", function () {

    window.location.href = "TelaBusca.html";

});

formStatusFornecedor.addEventListener("submit", function (event) {

    event.preventDefault();

    if (modoTela === "inativar") {

        alert("Fornecedor inativado com sucesso!");

    } else if (modoTela === "ativar") {

        alert("Fornecedor ativado com sucesso!");

    }

    window.location.href = "TelaBusca.html";

});

configurarTela();