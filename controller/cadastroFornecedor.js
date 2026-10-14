    // Recupera o modo em que a tela foi aberta
const modoTela = localStorage.getItem("modoTela");

// Recupera o fornecedor selecionado na tela de resultado
const fornecedorSelecionado = JSON.parse(
    localStorage.getItem("fornecedorSelecionado")
);

// Elementos do formulário
const formFornecedor = document.getElementById("formFornecedor");
const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");

// Campos
const codigo = document.getElementById("codigo");
const razaoSocial = document.getElementById("razaoSocial");
const nomeFantasia = document.getElementById("nomeFantasia");
const cnpj = document.getElementById("cnpj");
const email = document.getElementById("email");

const tipoTelefone = document.getElementById("tipoTelefone");
const ddd = document.getElementById("ddd");
const numeroTelefone = document.getElementById("numeroTelefone");

const tipoLogradouro = document.getElementById("tipoLogradouro");
const logradouro = document.getElementById("logradouro");
const numeroEndereco = document.getElementById("numeroEndereco");
const complemento = document.getElementById("complemento");
const bairro = document.getElementById("bairro");
const cep = document.getElementById("cep");
const cidade = document.getElementById("cidade");
const estado = document.getElementById("estado");
const pais = document.getElementById("pais");

function preencherFormulario(fornecedor) {

    if (!fornecedor) {
        return;
    }

    codigo.value = fornecedor.codigo || "";
    razaoSocial.value = fornecedor.razaoSocial || "";
    nomeFantasia.value = fornecedor.nomeFantasia || "";
    cnpj.value = fornecedor.cnpj || "";
    email.value = fornecedor.email || "";

    tipoTelefone.value = fornecedor.tipoTelefone || "";
    ddd.value = fornecedor.ddd || "";
    numeroTelefone.value = fornecedor.numeroTelefone || "";

    tipoLogradouro.value = fornecedor.tipoLogradouro || "";
    logradouro.value = fornecedor.logradouro || "";
    numeroEndereco.value = fornecedor.numeroEndereco || "";
    complemento.value = fornecedor.complemento || "";
    bairro.value = fornecedor.bairro || "";
    cep.value = fornecedor.cep || "";
    cidade.value = fornecedor.cidade || "";
    estado.value = fornecedor.estado || "";
    pais.value = fornecedor.pais || "";
}

function bloquearCampos() {

    const campos = formFornecedor.querySelectorAll("input, select");

    campos.forEach(function (campo) {
        campo.disabled = true;
    });

}

function configurarTela() {

    if (modoTela === "novo") {

        document.querySelector("h2").textContent = "Novo Fornecedor";

        formFornecedor.reset();

        codigo.disabled = true;

    } else if (modoTela === "visualizar") {

        document.querySelector("h2").textContent = "Visualizar Fornecedor";

        preencherFormulario(fornecedorSelecionado);

        bloquearCampos();

        btnSalvar.style.display = "none";

    } else if (modoTela === "alterar") {

        document.querySelector("h2").textContent = "Alterar Fornecedor";

        preencherFormulario(fornecedorSelecionado);

        codigo.disabled = true;
    }
}

btnCancelar.addEventListener("click", function () {

    window.location.href = "TelaBusca.html";

});

formFornecedor.addEventListener("submit", function (event) {

        event.preventDefault();

        if (modoTela === "novo") {
            alert("Fornecedor cadastrado com sucesso!");
        }

        if (modoTela === "alterar") {
            alert("Fornecedor alterado com sucesso!");
        }

        window.location.href = "TelaBusca.html";
});

configurarTela();