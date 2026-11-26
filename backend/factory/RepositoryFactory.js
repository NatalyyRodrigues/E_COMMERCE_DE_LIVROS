import { FornecedorDAO } from "../dao/FornecedorDAO.js";
import { DominioDAO } from "../dao/DominioDAO.js";
import { LogTransacaoDAO } from "../dao/LogTransacaoDAO.js";
import { HistoricoStatusDAO } from "../dao/HistoricoStatusDAO.js";
import { FornecedorRepository } from "../repository/FornecedorRepository.js";
import { FornecedorFacade } from "../facade/FornecedorFacade.js";

/**
 * Factory centraliza a criação das dependências (DAO → Repository → Facade).
 */
export class RepositoryFactory {
    static createFornecedorRepository() {
        const dao = new FornecedorDAO();
        return new FornecedorRepository(dao);
    }

    static createDominioDAO() {
        return new DominioDAO();
    }

    static createLogDAO() {
        return new LogTransacaoDAO();
    }

    static createHistoricoDAO() {
        return new HistoricoStatusDAO();
    }

    static createFornecedorFacade() {
        return new FornecedorFacade(
            this.createFornecedorRepository(),
            this.createDominioDAO(),
            this.createLogDAO(),
            this.createHistoricoDAO()
        );
    }
}