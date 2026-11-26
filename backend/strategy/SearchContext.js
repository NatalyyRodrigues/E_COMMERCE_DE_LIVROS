export class SearchContext {
    constructor(strategies = []) {
        this.strategies = strategies;
    }

    filtrar(fornecedores, filtros) {
        return fornecedores.filter((fornecedor) =>
            this.strategies.every((strategy) => strategy.matches(fornecedor, filtros))
        );
    }
}