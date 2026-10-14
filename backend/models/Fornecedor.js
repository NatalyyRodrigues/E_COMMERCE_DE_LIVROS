export class Fornecedor {
    #codigo;
    #razaoSocial;
    #nomeFantasia;
    #cnpj;
    #email;
    #status;
    #telefone;
    #endereco;

    constructor(
        codigo,
        razaoSocial,
        nomeFantasia,
        cnpj,
        email,
        status,
        telefone,
        endereco
    ) {
        this.#codigo = codigo;
        this.#razaoSocial = razaoSocial;
        this.#nomeFantasia = nomeFantasia;
        this.#cnpj = cnpj;
        this.#email = email;
        this.#status = status;
        this.#telefone = telefone;
        this.#endereco = endereco;
    }

    getCodigo() {
        return this.#codigo;
    }

    getRazaoSocial() {
        return this.#razaoSocial;
    }

    setRazaoSocial(valor) {
        this.#razaoSocial = valor;
    }

    getNomeFantasia() {
        return this.#nomeFantasia;
    }

    setNomeFantasia(valor) {
        this.#nomeFantasia = valor;
    }

    getCnpj() {
        return this.#cnpj;
    }

    setCnpj(valor) {
        this.#cnpj = valor;
    }

    getEmail() {
        return this.#email;
    }

    setEmail(valor) {
        this.#email = valor;
    }

    getStatus() {
        return this.#status;
    }

    setStatus(valor) {
        this.#status = valor;
    }

    getTelefone() {
        return this.#telefone;
    }

    setTelefone(valor) {
        this.#telefone = valor;
    }

    getEndereco() {
        return this.#endereco;
    }

    setEndereco(valor) {
        this.#endereco = valor;
    }
}