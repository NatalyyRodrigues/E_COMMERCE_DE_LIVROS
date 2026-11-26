import { api } from "./api.js";

function montarQuery(filtros) {
    const params = new URLSearchParams();
    Object.entries(filtros).forEach(([chave, valor]) => {
        if (valor !== undefined && valor !== null && String(valor).trim() !== "") {
            params.append(chave, valor);
        }
    });
    const query = params.toString();
    return query ? `?${query}` : "";
}

export const fornecedorService = {
    buscar(filtros) {
        return api.get(`/fornecedores${montarQuery(filtros)}`);
    },

    obterPorCodigo(codigo) {
        return api.get(`/fornecedores/${encodeURIComponent(codigo)}`);
    },

    criar(dados) {
        return api.post("/fornecedores", dados);
    },

    alterar(codigo, dados) {
        return api.put(`/fornecedores/${encodeURIComponent(codigo)}`, dados);
    },

    inativar(codigo, payload) {
        return api.post(`/fornecedores/${encodeURIComponent(codigo)}/inativar`, payload);
    },

    ativar(codigo, payload) {
        return api.post(`/fornecedores/${encodeURIComponent(codigo)}/ativar`, payload);
    },

    dominios() {
        return api.get("/fornecedores/dominios");
    },

    usuario() {
        return api.get("/fornecedores/usuario");
    }
};