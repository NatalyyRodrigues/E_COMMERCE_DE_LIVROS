export class Estado {
    #idEstado;
    #sigla;
    #nome;
    #pais;

    constructor(idEstado, sigla, nome, pais) {
        this.#idEstado = idEstado;
        this.#sigla = sigla;
        this.#nome = nome;
        this.#pais = pais;
    }

    getIdEstado() {
        return this.#idEstado;
    }

    getSigla() {
        return this.#sigla;
    }

    setSigla(valor) {
        this.#sigla = valor;
    }

    getNome() {
        return this.#nome;
    }

    setNome(valor) {
        this.#nome = valor;
    }

    getPais() {
        return this.#pais;
    }

    setPais(valor) {
        this.#pais = valor;
    }
}