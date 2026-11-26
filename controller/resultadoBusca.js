import { fornecedorService } from "../services/fornecedorService.js";
import { exibirUsuarioAutenticado } from "../services/usuarioUi.js";

let fornecedorSelecionado = null;

function obterFiltrosAtuaisNaTela() {
    const base = JSON.parse(localStorage.getItem("filtrosFornecedor") || "{}");
    return {
        ...base,
        razaoSocial: document.getElementById("razaoSocial")?.value.trim().toLowerCase() || "",
        status: document.getElementById("status")?.value || "todos"
    };
}

function filtrosMudaram() {
    const congelados = JSON.parse(localStorage.getItem("filtrosCongelados") || "{}");
    return JSON.stringify(obterFiltrosAtuaisNaTela()) !== JSON.stringify(congelados);
}

function atualizarEstadoBotoes(fornecedor) {
    const btnVisualizar = document.getElementById("btn-visualizar");
    const btnAlterar = document.getElementById("btn-alterar");
    const btnInativar = document.getElementById("btn-inativar");
    const btnAtivar = document.getElementById("btn-ativar");
    const btnNovo = document.getElementById("btn-novo");

    const consultaRealizada = localStorage.getItem("consultaRealizada") === "true";
    const parametrosAlterados = filtrosMudaram();

    if (btnNovo) {
        btnNovo.disabled = !consultaRealizada || parametrosAlterados;
    }

    if (!fornecedor) {
        [btnVisualizar, btnAlterar, btnInativar, btnAtivar].forEach((botao) => {
            if (botao) botao.disabled = true;
        });
        return;
    }

    if (btnVisualizar) btnVisualizar.disabled = false;
    if (btnAlterar) btnAlterar.disabled = false;

    const status = fornecedor.status.toLowerCase();
    if (status === "ativo") {
        if (btnInativar) btnInativar.disabled = false;
        if (btnAtivar) btnAtivar.disabled = true;
    } else {
        if (btnInativar) btnInativar.disabled = true;
        if (btnAtivar) btnAtivar.disabled = false;
    }
}

function exibirMensagem(texto, tipo = "info") {
    const elemento = document.getElementById("mensagemResultado");
    if (!elemento) {
        return;
    }
    elemento.className = `alert alert-${tipo}`;
    elemento.textContent = texto;
    elemento.classList.remove("d-none");
}

async function carregarTabelaFiltrada(tbody) {
    tbody.innerHTML = "<tr><td colspan='7' class='text-center'>Carregando...</td></tr>";
    fornecedorSelecionado = null;
    atualizarEstadoBotoes(null);

    const filtrosSalvos = JSON.parse(localStorage.getItem("filtrosFornecedor")) || {};
    try {
        const resposta = await fornecedorService.buscar(filtrosSalvos);
        const lista = resposta.itens || [];
        tbody.innerHTML = "";

        if (lista.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted">Nenhum fornecedor encontrado.</td></tr>`;
            exibirMensagem("Nenhum fornecedor encontrado para os critérios informados (E3). Você pode cadastrar um novo.", "warning");
            atualizarEstadoBotoes(null);
            return;
        }

        document.getElementById("mensagemResultado")?.classList.add("d-none");

        lista.forEach((fornecedor) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${fornecedor.codigo}</td>
                <td>${fornecedor.razaoSocial}</td>
                <td>${fornecedor.nomeFantasia}</td>
                <td>${fornecedor.cnpj}</td>
                <td>${fornecedor.cidade}</td>
                <td>${fornecedor.estado}</td>
                <td>${fornecedor.status}</td>
            `;

            tr.addEventListener("click", () => {
                tbody.querySelectorAll("tr").forEach((linha) => linha.classList.remove("table-primary"));
                tr.classList.add("table-primary");
                fornecedorSelecionado = fornecedor;
                atualizarEstadoBotoes(fornecedor);
            });

            tbody.appendChild(tr);
        });

        atualizarEstadoBotoes(null);
    } catch (erro) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Erro ao consultar fornecedores.</td></tr>`;
        exibirMensagem(erro.message, "danger");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    exibirUsuarioAutenticado();

    const filtrosSalvos = JSON.parse(localStorage.getItem("filtrosFornecedor") || "{}");
    if (filtrosSalvos.razaoSocial) {
        const campoRazao = document.getElementById("razaoSocial");
        if (campoRazao) campoRazao.value = filtrosSalvos.razaoSocial;
    }
    if (filtrosSalvos.status) {
        const campoStatus = document.getElementById("status");
        if (campoStatus) campoStatus.value = filtrosSalvos.status;
    }

    const camposRefiltro = ["razaoSocial", "status"];
    camposRefiltro.forEach((id) => {
        document.getElementById(id)?.addEventListener("input", () => atualizarEstadoBotoes(fornecedorSelecionado));
        document.getElementById(id)?.addEventListener("change", () => atualizarEstadoBotoes(fornecedorSelecionado));
    });

    document.getElementById("buscar")?.addEventListener("click", async (event) => {
        event.preventDefault();
        const filtrosAtualizados = obterFiltrosAtuaisNaTela();
        localStorage.setItem("filtrosFornecedor", JSON.stringify(filtrosAtualizados));
        localStorage.setItem("consultaRealizada", "true");
        localStorage.setItem("filtrosCongelados", JSON.stringify(filtrosAtualizados));
        await carregarTabelaFiltrada(document.getElementById("tabelaFornecedores"));
    });

    document.getElementById("btn-visualizar")?.addEventListener("click", async () => {
        if (!fornecedorSelecionado) return;
        const completo = await fornecedorService.obterPorCodigo(fornecedorSelecionado.codigo);
        localStorage.setItem("fornecedorSelecionado", JSON.stringify(completo));
        localStorage.setItem("modoTela", "visualizar");
        window.location.href = "CadastroFornecedor.html";
    });

    document.getElementById("btn-alterar")?.addEventListener("click", async () => {
        if (!fornecedorSelecionado) return;
        const completo = await fornecedorService.obterPorCodigo(fornecedorSelecionado.codigo);
        localStorage.setItem("fornecedorSelecionado", JSON.stringify(completo));
        localStorage.setItem("modoTela", "alterar");
        window.location.href = "CadastroFornecedor.html";
    });

    document.getElementById("btn-novo")?.addEventListener("click", () => {
        localStorage.setItem("modoTela", "novo");
        localStorage.removeItem("fornecedorSelecionado");
        window.location.href = "CadastroFornecedor.html";
    });

    document.getElementById("btn-inativar")?.addEventListener("click", () => {
        if (!fornecedorSelecionado) return;
        localStorage.setItem("fornecedorSelecionado", JSON.stringify(fornecedorSelecionado));
        localStorage.setItem("modoTela", "inativar");
        window.location.href = "AtivacaoDesativacao.html";
    });

    document.getElementById("btn-ativar")?.addEventListener("click", () => {
        if (!fornecedorSelecionado) return;
        localStorage.setItem("fornecedorSelecionado", JSON.stringify(fornecedorSelecionado));
        localStorage.setItem("modoTela", "ativar");
        window.location.href = "AtivacaoDesativacao.html";
    });

    const tbody = document.getElementById("tabelaFornecedores");
    if (tbody && localStorage.getItem("consultaRealizada") === "true") {
        carregarTabelaFiltrada(tbody);
    } else if (tbody) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted">Realize uma busca na tela anterior.</td></tr>`;
        atualizarEstadoBotoes(null);
    }
});