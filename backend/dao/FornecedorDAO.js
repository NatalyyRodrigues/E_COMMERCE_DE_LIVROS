import { executeQuery, executeOne, executeDml } from "../config/database.js";

const SELECT_BASE = `
    SELECT f.COD_FORNECEDOR AS cod_fornecedor,
           f.RAZAO_SOCIAL AS razao_social,
           f.NOME_FANTASIA AS nome_fantasia,
           f.CNPJ AS cnpj,
           f.EMAIL AS email,
           f.STATUS AS status,
           f.DDD AS ddd,
           f.NUMERO_TELEFONE AS numero_telefone,
           f.LOGRADOURO AS logradouro,
           f.NUMERO_ENDERECO AS numero_endereco,
           f.COMPLEMENTO AS complemento,
           f.BAIRRO AS bairro,
           f.CEP AS cep,
           f.CIDADE AS cidade,
           e.SIGLA AS estado_sigla,
           tt.DESCRICAO AS tipo_telefone_desc,
           tl.DESCRICAO AS tipo_logradouro_desc,
           p.NOME AS pais_nome
      FROM FORNECEDOR f
      JOIN ESTADO e ON e.ID_ESTADO = f.ID_ESTADO
      JOIN TIPO_TELEFONE tt ON tt.ID_TIPO_TELEFONE = f.ID_TIPO_TELEFONE
      JOIN TIPO_LOGRADOURO tl ON tl.ID_TIPO_LOGRADOURO = f.ID_TIPO_LOGRADOURO
      JOIN PAIS p ON p.ID_PAIS = f.ID_PAIS
`;

export class FornecedorDAO {
    async findAll() {
        return executeQuery(`${SELECT_BASE} ORDER BY f.COD_FORNECEDOR`);
    }

    async findByCodigo(codigo) {
        return executeOne(`${SELECT_BASE} WHERE f.COD_FORNECEDOR = :codigo`, { codigo });
    }

    async findByCnpj(cnpj) {
        return executeOne(`SELECT COD_FORNECEDOR AS cod_fornecedor FROM FORNECEDOR WHERE CNPJ = :cnpj`, { cnpj });
    }

    async getNextCodigo() {
        const row = await executeOne(`
            SELECT MAX(TO_NUMBER(REGEXP_SUBSTR(COD_FORNECEDOR, '[0-9]+'))) AS max_num
              FROM FORNECEDOR
             WHERE COD_FORNECEDOR LIKE 'F%'
        `);

        const next = row?.max_num ? Number(row.max_num) + 1 : 1;
        return `F${String(next).padStart(4, "0")}`;
    }

    async insert(fornecedor) {
        return executeDml(
            `INSERT INTO FORNECEDOR (
                COD_FORNECEDOR, RAZAO_SOCIAL, NOME_FANTASIA, CNPJ, EMAIL, STATUS,
                DDD, NUMERO_TELEFONE, LOGRADOURO, NUMERO_ENDERECO, COMPLEMENTO, BAIRRO, CEP, CIDADE,
                ID_TIPO_TELEFONE, ID_TIPO_LOGRADOURO, ID_PAIS, ID_ESTADO
            ) VALUES (
                :cod_fornecedor, :razao_social, :nome_fantasia, :cnpj, :email, :status,
                :ddd, :numero_telefone, :logradouro, :numero_endereco, :complemento, :bairro, :cep, :cidade,
                :id_tipo_telefone, :id_tipo_logradouro, :id_pais, :id_estado
            )`,
            fornecedor
        );
    }

    async update(codigo, fornecedor) {
        const binds = {
            cod_fornecedor: codigo,
            razao_social: fornecedor.razao_social,
            nome_fantasia: fornecedor.nome_fantasia,
            cnpj: fornecedor.cnpj,
            email: fornecedor.email,
            ddd: fornecedor.ddd,
            numero_telefone: fornecedor.numero_telefone,
            logradouro: fornecedor.logradouro,
            numero_endereco: fornecedor.numero_endereco,
            complemento: fornecedor.complemento,
            bairro: fornecedor.bairro,
            cep: fornecedor.cep,
            cidade: fornecedor.cidade,
            id_tipo_telefone: fornecedor.id_tipo_telefone,
            id_tipo_logradouro: fornecedor.id_tipo_logradouro,
            id_pais: fornecedor.id_pais,
            id_estado: fornecedor.id_estado
        };

        return executeDml(
            `UPDATE FORNECEDOR SET
                RAZAO_SOCIAL = :razao_social,
                NOME_FANTASIA = :nome_fantasia,
                CNPJ = :cnpj,
                EMAIL = :email,
                DDD = :ddd,
                NUMERO_TELEFONE = :numero_telefone,
                LOGRADOURO = :logradouro,
                NUMERO_ENDERECO = :numero_endereco,
                COMPLEMENTO = :complemento,
                BAIRRO = :bairro,
                CEP = :cep,
                CIDADE = :cidade,
                ID_TIPO_TELEFONE = :id_tipo_telefone,
                ID_TIPO_LOGRADOURO = :id_tipo_logradouro,
                ID_PAIS = :id_pais,
                ID_ESTADO = :id_estado
             WHERE COD_FORNECEDOR = :cod_fornecedor`,
            binds
        );
    }

    async updateStatus(codigo, status) {
        return executeDml(`UPDATE FORNECEDOR SET STATUS = :status WHERE COD_FORNECEDOR = :codigo`, {
            status,
            codigo
        });
    }
}