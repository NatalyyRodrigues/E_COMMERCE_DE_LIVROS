import { executeDml, nextId } from "../config/database.js";

export class LogTransacaoDAO {
    async insert({ cod_fornecedor, tipo_operacao, usuario_responsavel, dados_alterados }) {
        const id_log = await nextId("FORNECEDOR_LOG_TRANSACAO", "ID_LOG");

        return executeDml(
            `INSERT INTO FORNECEDOR_LOG_TRANSACAO (
                ID_LOG, TIPO_OPERACAO, USUARIO_RESPONSAVEL, DATA_HORA_OPERACAO, DADOS_ALTERADOS, COD_FORNECEDOR
            ) VALUES (
                :id_log, :tipo_operacao, :usuario_responsavel, SYSTIMESTAMP, :dados_alterados, :cod_fornecedor
            )`,
            {
                id_log,
                tipo_operacao,
                usuario_responsavel,
                dados_alterados,
                cod_fornecedor
            }
        );
    }
}