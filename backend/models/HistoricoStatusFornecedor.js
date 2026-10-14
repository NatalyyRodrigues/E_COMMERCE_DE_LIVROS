export class HistoricoStatusFornecedor {
    #idHistorico;
    #statusAnterior;
    #statusNovo;
    #justificativa;
    #usuarioResponsavel;
    #dataHoraOperacao;
    #fornecedor;
    #categoriaAtivacao;
    #categoriaInativacao;

    constructor(
        idHistorico,
        statusAnterior,
        statusNovo,
        justificativa,
        usuarioResponsavel,
        dataHoraOperacao,
        fornecedor,
        categoriaAtivacao,
        categoriaInativacao
    ) {
        this.#idHistorico = idHistorico;
        this.#statusAnterior = statusAnterior;
        this.#statusNovo = statusNovo;
        this.#justificativa = justificativa;
        this.#usuarioResponsavel = usuarioResponsavel;
        this.#dataHoraOperacao = dataHoraOperacao;
        this.#fornecedor = fornecedor;
        this.#categoriaAtivacao = categoriaAtivacao;
        this.#categoriaInativacao = categoriaInativacao;
    }

    getIdHistorico() {
        return this.#idHistorico;
    }

    getStatusAnterior() {
        return this.#statusAnterior;
    }

    setStatusAnterior(valor) {
        this.#statusAnterior = valor;
    }

    getStatusNovo() {
        return this.#statusNovo;
    }

    setStatusNovo(valor) {
        this.#statusNovo = valor;
    }

    getJustificativa() {
        return this.#justificativa;
    }

    setJustificativa(valor) {
        this.#justificativa = valor;
    }

    getUsuarioResponsavel() {
        return this.#usuarioResponsavel;
    }

    setUsuarioResponsavel(valor) {
        this.#usuarioResponsavel = valor;
    }

    getDataHoraOperacao() {
        return this.#dataHoraOperacao;
    }

    setDataHoraOperacao(valor) {
        this.#dataHoraOperacao = valor;
    }

    getFornecedor() {
        return this.#fornecedor;
    }

    setFornecedor(valor) {
        this.#fornecedor = valor;
    }

    getCategoriaAtivacao() {
        return this.#categoriaAtivacao;
    }

    setCategoriaAtivacao(valor) {
        this.#categoriaAtivacao = valor;
    }

    getCategoriaInativacao() {
        return this.#categoriaInativacao;
    }

    setCategoriaInativacao(valor) {
        this.#categoriaInativacao = valor;
    }
}