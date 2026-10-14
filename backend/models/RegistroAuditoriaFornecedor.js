export class RegistroAuditoriaFornecedor {
    #idLog;
    #tipoOperacao;
    #usuarioResponsavel;
    #dataHoraOperacao;
    #dadosAlterados;
    #fornecedor;

    constructor(
        idLog,
        tipoOperacao,
        usuarioResponsavel,
        dataHoraOperacao,
        dadosAlterados,
        fornecedor
    ) {
        this.#idLog = idLog;
        this.#tipoOperacao = tipoOperacao;
        this.#usuarioResponsavel = usuarioResponsavel;
        this.#dataHoraOperacao = dataHoraOperacao;
        this.#dadosAlterados = dadosAlterados;
        this.#fornecedor = fornecedor;
    }

    getIdLog() {
        return this.#idLog;
    }

    getTipoOperacao() {
        return this.#tipoOperacao;
    }

    setTipoOperacao(valor) {
        this.#tipoOperacao = valor;
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

    getDadosAlterados() {
        return this.#dadosAlterados;
    }

    setDadosAlterados(valor) {
        this.#dadosAlterados = valor;
    }

    getFornecedor() {
        return this.#fornecedor;
    }

    setFornecedor(valor) {
        this.#fornecedor = valor;
    }
}