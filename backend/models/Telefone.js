export class Telefone {
    #tipo;
    #ddd;
    #numero;

    constructor(tipo, ddd, numero) {
        this.#tipo = tipo;
        this.#ddd = ddd;
        this.#numero = numero;
    }

    getTipo() {
        return this.#tipo;
    }

    setTipo(valor) {
        this.#tipo = valor;
    }

    getDdd() {
        return this.#ddd;
    }

    setDdd(valor) {
        this.#ddd = valor;
    }

    getNumero() {
        return this.#numero;
    }

    setNumero(valor) {
        this.#numero = valor;
    }
}