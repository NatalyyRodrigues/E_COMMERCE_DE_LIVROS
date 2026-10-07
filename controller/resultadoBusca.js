
// Variável global para armazenar o registro selecionado na tabela
let fornecedorSelecionado = null;


//Toda a lógica fica dentro desse DOMContentLoaded, porque está esperando o
// html terminar de ser executado para rodar o restante da lógica
document.addEventListener("DOMContentLoaded", () => {


    const btnBuscar = document.getElementById("buscar");
    
    if (btnBuscar) {
        btnBuscar.addEventListener("click", (e) => {
            e.preventDefault(); // Impede o recarregamento da página (comportamento padrão do type="submit")

            // Captura os valores atuais da tela (verifique se os IDs dos seus inputs são esses mesmos)
            const valorRazao = document.getElementById("razaoSocial")?.value.trim().toLowerCase() || "";
            const valorStatus = document.getElementById("status")?.value || "todos";

            // Recupera os filtros anteriores para não perder dados como CNPJ, Cidade ou Estado
            const filtrosAtuais = JSON.parse(localStorage.getItem("filtrosFornecedor")) || {};
            
            // Atualiza apenas a Razão Social e o Status com o que foi digitado/selecionado agora
            filtrosAtuais.razaoSocial = valorRazao;
            filtrosAtuais.status = valorStatus;

            // Salva os filtros atualizados
            localStorage.setItem("filtrosFornecedor", JSON.stringify(filtrosAtuais));
            
            // Procura a tabela e recarrega passando os novos filtros
            const tbody = document.getElementById("tabelaFornecedoresMock");
            if (tbody) {
                carregarTabelaFiltrada(tbody);
            }
        });
    }
      //botão visualizar que será direcionado para a tela cadastro fornecedor, tela que ainda ser´´a implementada pela debora        
        const btnVisualizar = document.getElementById("btn-visualizar");
        if (btnVisualizar) {
        btnVisualizar.addEventListener("click", () => {
            if (fornecedorSelecionado) {
                // Salva os dados do fornecedor selecionado
                localStorage.setItem("fornecedorSelecionado", JSON.stringify(fornecedorSelecionado));
                // Define o modo como 'visualizar'
                localStorage.setItem("modoTela", "visualizar");
                
                // Redireciona para a tela do formulário
                window.location.href = "CadastroFornecedor.html";
            }
        });
    }
    

// Captura o botão Alterar do HTML e redireciona também para a tela de cadastroFornecedor
const btnAlterar = document.getElementById("btn-alterar");

if (btnAlterar) {
    btnAlterar.addEventListener("click", () => {
        // Verifica se existe um fornecedor selecionado na tabela
        if (fornecedorSelecionado) {
            // Salva os dados do fornecedor selecionado
            localStorage.setItem("fornecedorSelecionado", JSON.stringify(fornecedorSelecionado));
            
            // Define o modo da tela para a pessoa que assumir o formulário saber que é uma edição
            localStorage.setItem("modoTela", "alterar");
            
            // Redireciona o navegador para a tela de cadastro/edição
            window.location.href = "CadastroFornecedor.html";
        }
    });
}
        

    // Procure o botão no DOM
    const btnNovo = document.getElementById("btn-novo");

    // Se o botão existir na tela atual
    if (btnNovo) {
        btnNovo.addEventListener("click", () => {
            localStorage.setItem("modoTela", "novo");
            
            // Limpa o fornecedor selecionado, caso haja algum
            localStorage.removeItem("fornecedorSelecionado");

            // Redireciona o navegador para a tela de cadastro
            window.location.href = "CadastroFornecedor.html"; 
        });
    }

    //Bloco que exibe os valores filtrados na tela de resultadoBusca

    //procura a tabelaFornecedoresMock no html resultadoBusca.html
    const tbody = document.getElementById("tabelaFornecedoresMock");

    //verifica se a pagina abriu a tela Resultado busca, se sim, chama a função carregarTabelaFiltrada
    if (tbody) {
        carregarTabelaFiltrada(tbody);
    }
});

function carregarTabelaFiltrada(tbody) {
    //
    tbody.innerHTML = "";

    // Recupera do localStorage os filtros salvos na etapa anterior
    const filtros = JSON.parse(localStorage.getItem("filtrosFornecedor")) || {};

    // Aplica o filtro sobre o array mockado (fornecedoresMock) com o tratamento de letras maiusculas e minusculas com o toLowerCase
        const fornecedoresFiltrados = fornecedoresMock.filter(fornecedor => {
        const matchCodigo = !filtros.codigo || fornecedor.codigo.toLowerCase().includes(filtros.codigo);
        const matchRazao = !filtros.razaoSocial || fornecedor.razaoSocial.toLowerCase().includes(filtros.razaoSocial);
        const matchFantasia = !filtros.nomeFantasia || fornecedor.nomeFantasia.toLowerCase().includes(filtros.nomeFantasia);
        const matchCnpj = !filtros.cnpj || fornecedor.cnpj.includes(filtros.cnpj);
        const matchCidade = !filtros.cidade || fornecedor.cidadeUf.toLowerCase().includes(filtros.cidade);
        const matchEstado = !filtros.estado || fornecedor.cidadeUf.includes(filtros.estado);
        const matchStatus = !filtros.status || filtros.status === "todos" || fornecedor.status.toLowerCase() === filtros.status.toLowerCase();

        return matchCodigo && matchRazao && matchFantasia && matchCnpj && matchCidade && matchEstado && matchStatus;
    });

    // Validação se nenhum fornecedor atender aos critérios digitados, retorna como fornecedor não encontrado
    if (fornecedoresFiltrados.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">Nenhum fornecedor encontrado.</td></tr>`;
        return;
    }

    // Desenha as linhas da tabela
    fornecedoresFiltrados.forEach(fornecedor => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${fornecedor.codigo}</td>
            <td>${fornecedor.razaoSocial}</td>
            <td>${fornecedor.nomeFantasia}</td>
            <td>${fornecedor.cnpj}</td>
            <td>${fornecedor.cidadeUf}</td>
            <td>${fornecedor.status}</td>
        `;

        // Adiciona a linha e permite selecionar o fornecedor ao clicar,
        // destacando a linha, salvando o fornecedor e atualizando os botões.
        tbody.appendChild(tr);

            // Evento de seleção da linha ao clicar
            tr.addEventListener("click", () => {
            // Remove a classe azul de todas as outras linhas
            const todasAsLinhas = tbody.querySelectorAll("tr");
            todasAsLinhas.forEach(linha => linha.classList.remove("table-primary"));

            // Adiciona a classe de destaque (azul claro do Bootstrap) na linha selecionada
            tr.classList.add("table-primary");

            // Salva o objeto do fornecedor clicado
            fornecedorSelecionado = fornecedor;

            // Atualiza os botões da tela conforme as regras do requisito P2
            atualizarEstadoBotoes(fornecedor);
        });

    });
        //função para habilitar os botões após ser selecionado algum fornecedor 
        function atualizarEstadoBotoes(fornecedor) {
        const btnVisualizar = document.getElementById("btn-visualizar");
        const btnAlterar = document.getElementById("btn-alterar");

        // Se existe um fornecedor selecionado, habilita Visualizar e Alterar
        if (fornecedor) {
        if (btnVisualizar) btnVisualizar.disabled = false;
        if (btnAlterar) btnAlterar.disabled = false;
        }
        }

}
      