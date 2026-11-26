/**
 * Contrato do padrão Repository para fornecedores.
 */
export class IFornecedorRepository {
    listar() {
        throw new Error("listar() não implementado");
    }

    obterPorCodigo(_codigo) {
        throw new Error("obterPorCodigo() não implementado");
    }

    buscarPorCnpj(_cnpj) {
        throw new Error("buscarPorCnpj() não implementado");
    }

    inserir(_dados) {
        throw new Error("inserir() não implementado");
    }

    atualizar(_codigo, _dados) {
        throw new Error("atualizar() não implementado");
    }

    alterarStatus(_codigo, _status) {
        throw new Error("alterarStatus() não implementado");
    }
}