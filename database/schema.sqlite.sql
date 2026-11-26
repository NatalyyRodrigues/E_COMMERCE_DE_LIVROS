-- SQLite — espelhamento lógico do MER Oracle (CDU01)
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS pais (
    id_pais INTEGER PRIMARY KEY,
    nome TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS estado (
    id_estado INTEGER PRIMARY KEY,
    sigla TEXT NOT NULL UNIQUE,
    nome TEXT NOT NULL,
    id_pais INTEGER NOT NULL REFERENCES pais(id_pais)
);

CREATE TABLE IF NOT EXISTS tipo_telefone (
    id_tipo_telefone INTEGER PRIMARY KEY,
    descricao TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tipo_logradouro (
    id_tipo_logradouro INTEGER PRIMARY KEY,
    descricao TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS categoria_inativ_fornecedor (
    id_categoria_inativacao INTEGER PRIMARY KEY,
    descricao TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS categoria_ativ_fornecedor (
    id_categoria_ativacao INTEGER PRIMARY KEY,
    descricao TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS fornecedor (
    cod_fornecedor TEXT PRIMARY KEY,
    razao_social TEXT NOT NULL,
    nome_fantasia TEXT NOT NULL,
    cnpj TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('ATIVO', 'INATIVO')),
    ddd TEXT NOT NULL,
    numero_telefone TEXT NOT NULL,
    logradouro TEXT NOT NULL,
    numero_endereco TEXT NOT NULL,
    complemento TEXT,
    bairro TEXT NOT NULL,
    cep TEXT NOT NULL,
    cidade TEXT NOT NULL,
    id_tipo_telefone INTEGER NOT NULL REFERENCES tipo_telefone(id_tipo_telefone),
    id_tipo_logradouro INTEGER NOT NULL REFERENCES tipo_logradouro(id_tipo_logradouro),
    id_pais INTEGER NOT NULL REFERENCES pais(id_pais),
    id_estado INTEGER NOT NULL REFERENCES estado(id_estado)
);

CREATE TABLE IF NOT EXISTS fornecedor_historico_status (
    id_historico INTEGER PRIMARY KEY AUTOINCREMENT,
    status_anterior TEXT NOT NULL,
    status_novo TEXT NOT NULL,
    justificativa TEXT NOT NULL,
    usuario_responsavel TEXT NOT NULL,
    data_hora_operacao TEXT NOT NULL,
    cod_fornecedor TEXT NOT NULL REFERENCES fornecedor(cod_fornecedor),
    id_categoria_ativacao INTEGER REFERENCES categoria_ativ_fornecedor(id_categoria_ativacao),
    id_categoria_inativacao INTEGER REFERENCES categoria_inativ_fornecedor(id_categoria_inativacao)
);

CREATE TABLE IF NOT EXISTS fornecedor_log_transacao (
    id_log INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo_operacao TEXT NOT NULL,
    usuario_responsavel TEXT NOT NULL,
    data_hora_operacao TEXT NOT NULL,
    dados_alterados TEXT NOT NULL,
    cod_fornecedor TEXT NOT NULL REFERENCES fornecedor(cod_fornecedor)
);