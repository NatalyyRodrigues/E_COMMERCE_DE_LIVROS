export class CategoriaAtivacao {
    #idCategoriaAtivacao;
    #descricao;

    constructor(idCategoriaAtivacao, descricao) {
        this.#idCategoriaAtivacao = idCategoriaAtivacao;
        this.#descricao = descricao;
    }

    getIdCategoriaAtivacao() {
        return this.#idCategoriaAtivacao;
    }

    getDescricao() {
        return this.#descricao;
    }

    setDescricao(valor) {
        this.#descricao = valor;
    }
}