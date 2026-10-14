export class TipoLogradouro {
    #identificacao;
    #descricao;

    constructor(identificacao, descricao) {
        this.#identificacao = identificacao;
        this.#descricao = descricao;
    }

    getIdentificacao() {
        return this.#identificacao;
    }

    getDescricao() {
        return this.#descricao;
    }

    setDescricao(valor) {
        this.#descricao = valor;
    }
}