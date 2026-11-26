import { executeDml, nextId } from "../config/database.js";

export class HistoricoStatusDAO {
    async insert(registro) {
        const id_historico = await nextId("FORNECEDOR_HISTORICO_STATUS", "ID_HISTORICO");

        return executeDml(
            `INSERT INTO FORNECEDOR_HISTORICO_STATUS (
                ID_HISTORICO, STATUS_ANTERIOR, STATUS_NOVO, JUSTIFICATIVA, USUARIO_RESPONSAVEL,
                DATA_HORA_OPERACAO, COD_FORNECEDOR, ID_CATEGORIA_ATIVACAO, ID_CATEGORIA_INATIVACAO
            ) VALUES (
                :id_historico, :status_anterior, :status_novo, :justificativa, :usuario_responsavel,
                SYSTIMESTAMP, :cod_fornecedor, :id_categoria_ativacao, :id_categoria_inativacao
            )`,
            {
                id_historico,
                status_anterior: registro.status_anterior,
                status_novo: registro.status_novo,
                justificativa: registro.justificativa,
                usuario_responsavel: registro.usuario_responsavel,
                cod_fornecedor: registro.cod_fornecedor,
                id_categoria_ativacao: registro.id_categoria_ativacao,
                id_categoria_inativacao: registro.id_categoria_inativacao
            }
        );
    }
}