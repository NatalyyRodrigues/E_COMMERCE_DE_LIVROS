export class EnderecoFornecedor {
    #tipoLogradouro;
    #logradouro;
    #numero;
    #complemento;
    #bairro;
    #cep;
    #cidade;
    #estado;
    #pais;

    constructor(tipoLogradouro, logradouro, numero, complemento, bairro, cep, cidade, estado, pais) {
        this.#tipoLogradouro = tipoLogradouro;
        this.#logradouro = logradouro;
        this.#numero = numero;
        this.#complemento = complemento;
        this.#bairro = bairro;
        this.#cep = cep;
        this.#cidade = cidade;
        this.#estado = estado;
        this.#pais = pais;
    }

    getTipoLogradouro() {
        return this.#tipoLogradouro;
    }

    getLogradouro() {
        return this.#logradouro;
    }

    getNumero() {
        return this.#numero;
    }

    getComplemento() {
        return this.#complemento;
    }

    getBairro() {
        return this.#bairro;
    }

    getCep() {
        return this.#cep;
    }

    getCidade() {
        return this.#cidade;
    }

    getEstado() {
        return this.#estado;
    }

    getPais() {
        return this.#pais;
    }
}