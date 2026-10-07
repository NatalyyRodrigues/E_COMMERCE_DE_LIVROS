document.addEventListener("DOMContentLoaded", () => {

     //Captura os dados da telaBusca.html, atráves do id do formulário: FormBusca
    const formBusca = document.getElementById("FormBusca");

    //validação para identificar se foi encontrado o formBusca
    if (formBusca) {
        formBusca.addEventListener("submit", (e) => {
            e.preventDefault(); // Impede o envio, reiniciando a tela padrão do html,para não perddermos os dados e tratarmos  no JS

            // Captura o valor de cada ID exatamente como está no seu HTML
            const filtros = {
                //Procura os ids guardados no html, trata os dados tirando o espaço com o value.trim
                // Substitui as letras maiúsculas para minusculas com o 
                //|| "" caso não haja valor, ele me retorna vazio Para todos os ids

                codigo: document.getElementById("codigo")?.value.trim().toLowerCase() || "",
                razaoSocial: document.getElementById("razaoSocial")?.value.trim().toLowerCase() || "",
                nomeFantasia: document.getElementById("nomeFantasia")?.value.trim().toLowerCase() || "",
                cnpj: document.getElementById("CNPJ")?.value.trim() || "",
                cidade: document.getElementById("cidade")?.value.trim().toLowerCase() || "",
                estado: document.getElementById("estado")?.value || "",
                status: document.getElementById("status")?.value || "todos"
            };

            // Salva na memória temporária do navegador (localStorage)
            localStorage.setItem("filtrosFornecedor", JSON.stringify(filtros));

            // Redireciona para a tela de resultados
            window.location.href = "ResultadoBusca.html";
        });
    }

});