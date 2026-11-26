import { executeQuery, executeOne } from "../config/database.js";

export class DominioDAO {
    async listEstados() {
        return executeQuery(`SELECT ID_ESTADO AS id, SIGLA AS sigla, NOME AS nome FROM ESTADO ORDER BY SIGLA`);
    }

    async listPaises() {
        return executeQuery(`SELECT ID_PAIS AS id, NOME AS nome FROM PAIS ORDER BY NOME`);
    }

    async listTiposTelefone() {
        return executeQuery(
            `SELECT ID_TIPO_TELEFONE AS id, DESCRICAO AS descricao FROM TIPO_TELEFONE ORDER BY ID_TIPO_TELEFONE`
        );
    }

    async listTiposLogradouro() {
        return executeQuery(
            `SELECT ID_TIPO_LOGRADOURO AS id, DESCRICAO AS descricao FROM TIPO_LOGRADOURO ORDER BY ID_TIPO_LOGRADOURO`
        );
    }

    async listCategoriasInativacao() {
        return executeQuery(
            `SELECT ID_CATEGORIA_INATIVACAO AS id, DESCRICAO AS descricao
               FROM CATEGORIA_INATIV_FORNECEDOR ORDER BY ID_CATEGORIA_INATIVACAO`
        );
    }

    async listCategoriasAtivacao() {
        return executeQuery(
            `SELECT ID_CATEGORIA_ATIVACAO AS id, DESCRICAO AS descricao
               FROM CATEGORIA_ATIV_FORNECEDOR ORDER BY ID_CATEGORIA_ATIVACAO`
        );
    }

    async findEstadoBySigla(sigla) {
        return executeOne(`SELECT * FROM ESTADO WHERE SIGLA = :sigla`, { sigla });
    }

    async findTipoTelefoneByDescricao(descricao) {
        return executeOne(`SELECT * FROM TIPO_TELEFONE WHERE DESCRICAO = :descricao`, { descricao });
    }

    async findTipoLogradouroByDescricao(descricao) {
        return executeOne(`SELECT * FROM TIPO_LOGRADOURO WHERE DESCRICAO = :descricao`, { descricao });
    }

    async findPaisByNome(nome) {
        return executeOne(`SELECT * FROM PAIS WHERE NOME = :nome`, { nome });
    }
}