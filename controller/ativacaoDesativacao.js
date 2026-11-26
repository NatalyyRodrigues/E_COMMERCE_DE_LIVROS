import { fornecedorService } from "../services/fornecedorService.js";
import { exibirUsuarioAutenticado } from "../services/usuarioUi.js";

const modoTela = localStorage.getItem("modoTela");
const fornecedorSelecionado = JSON.parse(localStorage.getItem("fornecedorSelecionado") || "null");

const tituloTela = document.getElementById("tituloTela");
const formStatusFornecedor = document.getElementById("formStatusFornecedor");
const btnCancelar = document.getElementById("btnCancelar");
const selectCategoria = document.getElementById("categoria");
const campoJustificativa = document.getElementById("justificativa");
const alertaValidacao = document.getElementById("alertaValidacao");

async function carregarCategorias() {
    const dominios = await fornecedorService.dominios();
    const categorias =
        modoTela === "inativar" ? dominios.categoriasInativacao : dominios.categoriasAtivacao;

    selectCategoria.innerHTML = '<option value="">Selecione</option>';
    categorias.forEach((categoria) => {
        const option = document.createElement("option");
        option.value = categoria.id;
        option.textContent = categoria.descricao;
        selectCategoria.appendChild(option);
    });
}

function configurarTela() {
    if (modoTela === "inativar") {
        tituloTela.textContent = "Inativar Fornecedor";
    } else if (modoTela === "ativar") {
        tituloTela.textContent = "Ativar Fornecedor";
    }
}

btnCancelar?.addEventListener("click", () => {
    window.location.href = "TelaBusca.html";
});

formStatusFornecedor?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const categoriaId = selectCategoria.value;
    const justificativa = campoJustificativa.value.trim();

    if (!categoriaId || !justificativa) {
        alertaValidacao?.classList.remove("d-none");
        alertaValidacao.textContent = "Informe categoria e justificativa (E4).";
        return;
    }

    try {
        const payload = { categoriaId, justificativa };
        const codigo = fornecedorSelecionado.codigo;
        const resposta =
            modoTela === "inativar"
                ? await fornecedorService.inativar(codigo, payload)
                : await fornecedorService.ativar(codigo, payload);

        alert(resposta.mensagem);
        window.location.href = "TelaBusca.html";
    } catch (erro) {
        const detalhes = erro.detalhes || {};
        alertaValidacao?.classList.remove("d-none");
        alertaValidacao.textContent = detalhes.mensagem || erro.message;
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    exibirUsuarioAutenticado();
    configurarTela();
    await carregarCategorias();
});