/**
 * Estratégia de filtro da consulta RF0085 (P1.1).
 */
export class ISearchStrategy {
    matches(_fornecedor, _filtros) {
        throw new Error("matches() não implementado");
    }
}