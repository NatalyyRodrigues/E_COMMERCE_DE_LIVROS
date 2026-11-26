import { fornecedorService } from "../services/fornecedorService.js";
import { exibirUsuarioAutenticado } from "../services/usuarioUi.js";

const modoTela = localStorage.getItem("modoTela");
const fornecedorSelecionado = JSON.parse(localStorage.getItem("fornecedorSelecionado") || "null");
const filtrosBusca = JSON.parse(localStorage.getItem("filtrosFornecedor") || "{}");

const formFornecedor = document.getElementById("formFornecedor");
const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");
const alertaValidacao = document.getElementById("alertaValidacao");

const campos = {
    codigo: document.getElementById("codigo"),
    razaoSocial: document.getElementById("razaoSocial"),
    nomeFantasia: document.getElementById("nomeFantasia"),
    cnpj: document.getElementById("cnpj"),
    email: document.getElementById("email"),
    status: document.getElementById("status"),
    tipoTelefone: document.getElementById("tipoTelefone"),
    ddd: document.getElementById("ddd"),
    numeroTelefone: document.getElementById("numeroTelefone"),
    tipoLogradouro: document.getElementById("tipoLogradouro"),
    logradouro: document.getElementById("logradouro"),
    numeroEndereco: document.getElementById("numeroEndereco"),
    complemento: document.getElementById("complemento"),
    bairro: document.getElementById("bairro"),
    cep: document.getElementById("cep"),
    cidade: document.getElementById("cidade"),
    estado: document.getElementById("estado"),
    pais: document.getElementById("pais")
};

function mostrarAlerta(mensagem, camposPendentes = []) {
    if (!alertaValidacao) {
        alert(mensagem);
        return;
    }
    const lista = camposPendentes.length
        ? `<ul class="mb-0">${camposPendentes.map((c) => `<li>${c}</li>`).join("")}</ul>`
        : "";
    alertaValidacao.innerHTML = `<strong>${mensagem}</strong>${lista}`;
    alertaValidacao.classList.remove("d-none");
}

function ocultarAlerta() {
    alertaValidacao?.classList.add("d-none");
}

function obterDadosFormulario() {
    return {
        codigo: campos.codigo.value,
        razaoSocial: campos.razaoSocial.value.trim(),
        nomeFantasia: campos.nomeFantasia.value.trim(),
        cnpj: campos.cnpj.value.trim(),
        email: campos.email.value.trim(),
        tipoTelefone: campos.tipoTelefone.value,
        ddd: campos.ddd.value.trim(),
        numeroTelefone: campos.numeroTelefone.value.trim(),
        tipoLogradouro: campos.tipoLogradouro.value,
        logradouro: campos.logradouro.value.trim(),
        numeroEndereco: campos.numeroEndereco.value.trim(),
        complemento: campos.complemento.value.trim(),
        bairro: campos.bairro.value.trim(),
        cep: campos.cep.value.trim(),
        cidade: campos.cidade.value.trim(),
        estado: campos.estado.value,
        pais: campos.pais.value
    };
}

function preencherFormulario(fornecedor) {
    if (!fornecedor) return;

    campos.codigo.value = fornecedor.codigo || "";
    campos.razaoSocial.value = fornecedor.razaoSocial || "";
    campos.nomeFantasia.value = fornecedor.nomeFantasia || "";
    campos.cnpj.value = fornecedor.cnpj || "";
    campos.email.value = fornecedor.email || "";
    campos.status.value = fornecedor.status || "";
    campos.tipoTelefone.value = fornecedor.tipoTelefone || "";
    campos.ddd.value = fornecedor.ddd || "";
    campos.numeroTelefone.value = fornecedor.numeroTelefone || "";
    campos.tipoLogradouro.value = fornecedor.tipoLogradouro || "";
    campos.logradouro.value = fornecedor.logradouro || "";
    campos.numeroEndereco.value = fornecedor.numeroEndereco || "";
    campos.complemento.value = fornecedor.complemento || "";
    campos.bairro.value = fornecedor.bairro || "";
    campos.cep.value = fornecedor.cep || "";
    campos.cidade.value = fornecedor.cidade || "";
    campos.estado.value = fornecedor.estado || "";
    campos.pais.value = fornecedor.pais || "Brasil";
}

function bloquearCampos() {
    formFornecedor.querySelectorAll("input, select, textarea").forEach((campo) => {
        campo.disabled = true;
    });
}

function configurarTela() {
    const titulo = document.querySelector("h2");

    if (modoTela === "novo") {
        titulo.textContent = "Novo Fornecedor";
        formFornecedor.reset();
        campos.codigo.disabled = true;
        campos.status.value = "ATIVO";
        campos.status.disabled = true;
        if (filtrosBusca.cnpj) {
            campos.cnpj.value = filtrosBusca.cnpj;
        }
    } else if (modoTela === "visualizar") {
        titulo.textContent = "Visualizar Fornecedor";
        preencherFormulario(fornecedorSelecionado);
        bloquearCampos();
        btnSalvar.style.display = "none";
    } else if (modoTela === "alterar") {
        titulo.textContent = "Alterar Fornecedor";
        preencherFormulario(fornecedorSelecionado);
        campos.codigo.disabled = true;
        campos.status.disabled = true;
    }
}

btnCancelar?.addEventListener("click", () => {
    window.location.href = "TelaBusca.html";
});

formFornecedor?.addEventListener("submit", async (event) => {
    event.preventDefault();
    ocultarAlerta();

    const dados = obterDadosFormulario();

    try {
        let resposta;

        if (modoTela === "novo") {
            resposta = await fornecedorService.criar(dados);
        } else if (modoTela === "alterar") {
            resposta = await fornecedorService.alterar(fornecedorSelecionado.codigo, dados);
        } else {
            return;
        }

        alert(resposta.mensagem);
        window.location.href = "TelaBusca.html";
    } catch (erro) {
        const detalhes = erro.detalhes || {};
        if (detalhes.codigoErro === "E1") {
            mostrarAlerta("Campos obrigatórios não preenchidos (E1):", detalhes.campos || []);
            return;
        }
        if (detalhes.codigoErro === "E2") {
            mostrarAlerta(detalhes.mensagem || "CNPJ já cadastrado (E2).");
            return;
        }
        mostrarAlerta(erro.message);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    exibirUsuarioAutenticado();
    configurarTela();
});