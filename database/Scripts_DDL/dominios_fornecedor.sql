-- =============================================================================
-- CDU01 — Script de dominios e de carga (RNF0013, pre-condicao 7.2)
-- Executado após executar o  ddl_fornecedor.sql
--
-- Responsavel por INSEREr os registros das tabelas de dominio. 
   --Nao possui  carga de fornecedores, apenas a carga dos dominios atividade etapa 2.
--
-- MERGE para poder executar de novo sem apagar fornecedor ja cadastrado.
-- Categorias limitadas aos valores (Comercial e
-- Administrativo) da etapa 1 de prototipo
-- =============================================================================

MERGE INTO pais d
USING (SELECT 1 AS id_pais, 'Brasil' AS nome FROM dual) s
ON (d.id_pais = s.id_pais)
WHEN MATCHED THEN
    UPDATE SET d.nome = s.nome
WHEN NOT MATCHED THEN
    INSERT (id_pais, nome) VALUES (s.id_pais, s.nome);

MERGE INTO estado d
USING (
    SELECT 1 AS id_estado, 'AC' AS sigla, 'Acre' AS nome, 1 AS id_pais FROM dual UNION ALL
    SELECT 2, 'AL', 'Alagoas', 1 FROM dual UNION ALL
    SELECT 3, 'AP', 'Amapá', 1 FROM dual UNION ALL
    SELECT 4, 'AM', 'Amazonas', 1 FROM dual UNION ALL
    SELECT 5, 'BA', 'Bahia', 1 FROM dual UNION ALL
    SELECT 6, 'CE', 'Ceará', 1 FROM dual UNION ALL
    SELECT 7, 'DF', 'Distrito Federal', 1 FROM dual UNION ALL
    SELECT 8, 'ES', 'Espírito Santo', 1 FROM dual UNION ALL
    SELECT 9, 'GO', 'Goiás', 1 FROM dual UNION ALL
    SELECT 10, 'MA', 'Maranhão', 1 FROM dual UNION ALL
    SELECT 11, 'MT', 'Mato Grosso', 1 FROM dual UNION ALL
    SELECT 12, 'MS', 'Mato Grosso do Sul', 1 FROM dual UNION ALL
    SELECT 13, 'MG', 'Minas Gerais', 1 FROM dual UNION ALL
    SELECT 14, 'PA', 'Pará', 1 FROM dual UNION ALL
    SELECT 15, 'PB', 'Paraíba', 1 FROM dual UNION ALL
    SELECT 16, 'PR', 'Paraná', 1 FROM dual UNION ALL
    SELECT 17, 'PE', 'Pernambuco', 1 FROM dual UNION ALL
    SELECT 18, 'PI', 'Piauí', 1 FROM dual UNION ALL
    SELECT 19, 'RJ', 'Rio de Janeiro', 1 FROM dual UNION ALL
    SELECT 20, 'RN', 'Rio Grande do Norte', 1 FROM dual UNION ALL
    SELECT 21, 'RS', 'Rio Grande do Sul', 1 FROM dual UNION ALL
    SELECT 22, 'RO', 'Rondônia', 1 FROM dual UNION ALL
    SELECT 23, 'RR', 'Roraima', 1 FROM dual UNION ALL
    SELECT 24, 'SC', 'Santa Catarina', 1 FROM dual UNION ALL
    SELECT 25, 'SP', 'São Paulo', 1 FROM dual UNION ALL
    SELECT 26, 'SE', 'Sergipe', 1 FROM dual UNION ALL
    SELECT 27, 'TO', 'Tocantins', 1 FROM dual
) s
ON (d.id_estado = s.id_estado)
WHEN MATCHED THEN
    UPDATE SET d.sigla = s.sigla, d.nome = s.nome, d.id_pais = s.id_pais
WHEN NOT MATCHED THEN
    INSERT (id_estado, sigla, nome, id_pais)
    VALUES (s.id_estado, s.sigla, s.nome, s.id_pais);

-- Tipos iguais aos combobox da tela de cadastro (Etapa 1).
MERGE INTO tipo_telefone d
USING (
    SELECT 1 AS id_tipo_telefone, 'Comercial' AS descricao FROM dual UNION ALL
    SELECT 2, 'Celular' FROM dual UNION ALL
    SELECT 3, 'Residencial' FROM dual
) s
ON (d.id_tipo_telefone = s.id_tipo_telefone)
WHEN MATCHED THEN
    UPDATE SET d.descricao = s.descricao
WHEN NOT MATCHED THEN
    INSERT (id_tipo_telefone, descricao)
    VALUES (s.id_tipo_telefone, s.descricao);

MERGE INTO tipo_logradouro d
USING (
    SELECT 1 AS id_tipo_logradouro, 'Rua' AS descricao FROM dual UNION ALL
    SELECT 2, 'Avenida' FROM dual UNION ALL
    SELECT 3, 'Travessa' FROM dual
) s
ON (d.id_tipo_logradouro = s.id_tipo_logradouro)
WHEN MATCHED THEN
    UPDATE SET d.descricao = s.descricao
WHEN NOT MATCHED THEN
    INSERT (id_tipo_logradouro, descricao)
    VALUES (s.id_tipo_logradouro, s.descricao);

-- Somente os valores exibidos em AtivacaoDesativacao.html.
MERGE INTO categoria_inativ_fornecedor d
USING (
    SELECT 1 AS id_categoria_inativacao, 'Comercial' AS descricao FROM dual UNION ALL
    SELECT 2, 'Administrativo' FROM dual
) s
ON (d.id_categoria_inativacao = s.id_categoria_inativacao)
WHEN MATCHED THEN
    UPDATE SET d.descricao = s.descricao
WHEN NOT MATCHED THEN
    INSERT (id_categoria_inativacao, descricao)
    VALUES (s.id_categoria_inativacao, s.descricao);

MERGE INTO categoria_ativ_fornecedor d
USING (
    SELECT 1 AS id_categoria_ativacao, 'Comercial' AS descricao FROM dual UNION ALL
    SELECT 2, 'Administrativo' FROM dual
) s
ON (d.id_categoria_ativacao = s.id_categoria_ativacao)
WHEN MATCHED THEN
    UPDATE SET d.descricao = s.descricao
WHEN NOT MATCHED THEN
    INSERT (id_categoria_ativacao, descricao)
    VALUES (s.id_categoria_ativacao, s.descricao);

-- Remove categorias inventadas por uma versao anterior deste script,
-- desde que nenhuma inativacao/ativacao ja as referencie.
DELETE FROM categoria_inativ_fornecedor c
 WHERE c.id_categoria_inativacao NOT IN (1, 2)
   AND NOT EXISTS (
        SELECT 1
          FROM fornecedor_historico_status h
         WHERE h.id_categoria_inativacao = c.id_categoria_inativacao
   );

DELETE FROM categoria_ativ_fornecedor c
 WHERE c.id_categoria_ativacao NOT IN (1, 2)
   AND NOT EXISTS (
        SELECT 1
          FROM fornecedor_historico_status h
         WHERE h.id_categoria_ativacao = c.id_categoria_ativacao
   );

COMMIT;
