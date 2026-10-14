export class Pais {
    #idPais;
    #nome;

    constructor(idPais, nome) {
        this.#idPais = idPais;
        this.#nome = nome;
    }

    getIdPais() {
        return this.#idPais;
    }

    getNome() {
        return this.#nome;
    }

    setNome(valor) {
        this.#nome = valor;
    }
}