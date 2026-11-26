-- Gerado por Oracle SQL Developer Data Modeler 24.3.1.351.0831
--   em:        2026-10-12 20:23:33 BRT
--   site:      Oracle Database 12c
--   tipo:      Oracle Database 12c



-- predefined type, no DDL - MDSYS.SDO_GEOMETRY

-- predefined type, no DDL - XMLTYPE

CREATE TABLE CATEGORIA_ATIV_FORNECEDOR 
    ( 
     id_categoria_ativacao NUMBER (10)  NOT NULL , 
     descricao             VARCHAR2 (100)  NOT NULL 
    ) 
;

ALTER TABLE CATEGORIA_ATIV_FORNECEDOR 
    ADD CONSTRAINT pk_cat_ativ_forn PRIMARY KEY ( id_categoria_ativacao ) ;

CREATE TABLE CATEGORIA_INATIV_FORNECEDOR 
    ( 
     id_categoria_inativacao NUMBER (10)  NOT NULL , 
     descricao               VARCHAR2 (100)  NOT NULL 
    ) 
;

ALTER TABLE CATEGORIA_INATIV_FORNECEDOR 
    ADD CONSTRAINT pk_cat_inativ_forn PRIMARY KEY ( id_categoria_inativacao ) ;

CREATE TABLE ESTADO 
    ( 
     id_estado NUMBER (10)  NOT NULL , 
     sigla     CHAR (2)  NOT NULL , 
     nome      VARCHAR2 (60)  NOT NULL , 
     id_pais   NUMBER (10)  NOT NULL 
    ) 
;

ALTER TABLE ESTADO 
    ADD CONSTRAINT ESTADO_PK PRIMARY KEY ( id_estado ) ;

ALTER TABLE ESTADO 
    ADD CONSTRAINT uk_estado_id_pais UNIQUE ( id_estado , id_pais ) ;

CREATE TABLE FORNECEDOR 
    ( 
     cod_fornecedor     VARCHAR2 (10)  NOT NULL , 
     razao_social       VARCHAR2 (100)  NOT NULL , 
     nome_fantasia      VARCHAR2 (60)  NOT NULL , 
     cnpj               VARCHAR2 (18)  NOT NULL , 
     email              VARCHAR2 (100)  NOT NULL , 
     status             VARCHAR2 (10)  NOT NULL , 
     ddd                VARCHAR2 (2)  NOT NULL , 
     numero_telefone    VARCHAR2 (9)  NOT NULL , 
     logradouro         VARCHAR2 (100)  NOT NULL , 
     numero_endereco    VARCHAR2 (10)  NOT NULL , 
     complemento        VARCHAR2 (60) , 
     bairro             VARCHAR2 (60)  NOT NULL , 
     cep                CHAR (8)  NOT NULL , 
     cidade             VARCHAR2 (60)  NOT NULL , 
     id_tipo_telefone   NUMBER (10)  NOT NULL , 
     id_tipo_logradouro NUMBER (10)  NOT NULL , 
     id_pais            NUMBER (10)  NOT NULL , 
     id_estado          NUMBER (10)  NOT NULL 
    ) 
;

ALTER TABLE FORNECEDOR 
    ADD CONSTRAINT FORNECEDOR_PK PRIMARY KEY ( cod_fornecedor ) ;

ALTER TABLE FORNECEDOR 
    ADD CONSTRAINT uk_fornecedor_cnpj UNIQUE ( cnpj ) ;

CREATE TABLE FORNECEDOR_HISTORICO_STATUS 
    ( 
     id_historico            NUMBER (19)  NOT NULL , 
     status_anterior         VARCHAR2 (10)  NOT NULL , 
     status_novo             VARCHAR2 (10)  NOT NULL , 
     justificativa           VARCHAR2 (255)  NOT NULL , 
     usuario_responsavel     VARCHAR2 (100)  NOT NULL , 
     data_hora_operacao      TIMESTAMP  NOT NULL , 
     cod_fornecedor          VARCHAR2 (10)  NOT NULL , 
     id_categoria_ativacao   NUMBER (10)  NOT NULL , 
     id_categoria_inativacao NUMBER (10)  NOT NULL 
    ) 
;

ALTER TABLE FORNECEDOR_HISTORICO_STATUS 
    ADD CONSTRAINT pk_forn_historico_status PRIMARY KEY ( id_historico ) ;

CREATE TABLE FORNECEDOR_LOG_TRANSACAO 
    ( 
     id_log              NUMBER (19)  NOT NULL , 
     tipo_operacao       VARCHAR2 (20)  NOT NULL , 
     usuario_responsavel VARCHAR2 (100)  NOT NULL , 
     data_hora_operacao  TIMESTAMP  NOT NULL , 
     dados_alterados     CLOB  NOT NULL , 
     cod_fornecedor      VARCHAR2 (10)  NOT NULL 
    ) 
;

ALTER TABLE FORNECEDOR_LOG_TRANSACAO 
    ADD CONSTRAINT pk_forn_log_transacao PRIMARY KEY ( id_log ) ;

CREATE TABLE PAIS 
    ( 
     id_pais NUMBER (10)  NOT NULL , 
     nome    VARCHAR2 (60)  NOT NULL 
    ) 
;

ALTER TABLE PAIS 
    ADD CONSTRAINT PAIS_PK PRIMARY KEY ( id_pais ) ;

CREATE TABLE TIPO_LOGRADOURO 
    ( 
     id_tipo_logradouro NUMBER (10)  NOT NULL , 
     descricao          VARCHAR2 (60)  NOT NULL 
    ) 
;

ALTER TABLE TIPO_LOGRADOURO 
    ADD CONSTRAINT TIPO_LOGRADOURO_PK PRIMARY KEY ( id_tipo_logradouro ) ;

CREATE TABLE TIPO_TELEFONE 
    ( 
     id_tipo_telefone NUMBER (10)  NOT NULL , 
     descricao        VARCHAR2 (60)  NOT NULL 
    ) 
;

ALTER TABLE TIPO_TELEFONE 
    ADD CONSTRAINT TIPO_TELEFONE_PK PRIMARY KEY ( id_tipo_telefone ) ;

ALTER TABLE ESTADO 
    ADD CONSTRAINT ESTADO_PAIS_FK FOREIGN KEY 
    ( 
     id_pais
    ) 
    REFERENCES PAIS 
    ( 
     id_pais
    ) 
;

ALTER TABLE FORNECEDOR 
    ADD CONSTRAINT fk_forn_estado_pais FOREIGN KEY 
    ( 
     id_estado,
     id_pais
    ) 
    REFERENCES ESTADO 
    ( 
     id_estado,
     id_pais
    ) 
;

ALTER TABLE FORNECEDOR_HISTORICO_STATUS 
    ADD CONSTRAINT fk_forn_hist_cat_ativacao FOREIGN KEY 
    ( 
     id_categoria_ativacao
    ) 
    REFERENCES CATEGORIA_ATIV_FORNECEDOR 
    ( 
     id_categoria_ativacao
    ) 
;

ALTER TABLE FORNECEDOR_HISTORICO_STATUS 
    ADD CONSTRAINT fk_forn_hist_cat_inativacao FOREIGN KEY 
    ( 
     id_categoria_inativacao
    ) 
    REFERENCES CATEGORIA_INATIV_FORNECEDOR 
    ( 
     id_categoria_inativacao
    ) 
;

ALTER TABLE FORNECEDOR_HISTORICO_STATUS 
    ADD CONSTRAINT fk_forn_hist_fornecedor FOREIGN KEY 
    ( 
     cod_fornecedor
    ) 
    REFERENCES FORNECEDOR 
    ( 
     cod_fornecedor
    ) 
;

ALTER TABLE FORNECEDOR_LOG_TRANSACAO 
    ADD CONSTRAINT fk_forn_log_fornecedor FOREIGN KEY 
    ( 
     cod_fornecedor
    ) 
    REFERENCES FORNECEDOR 
    ( 
     cod_fornecedor
    ) 
;

ALTER TABLE FORNECEDOR 
    ADD CONSTRAINT fk_forn_tipo_tel FOREIGN KEY 
    ( 
     id_tipo_telefone
    ) 
    REFERENCES TIPO_TELEFONE 
    ( 
     id_tipo_telefone
    ) 
;

ALTER TABLE FORNECEDOR 
    ADD CONSTRAINT fk_tipo_log FOREIGN KEY 
    ( 
     id_tipo_logradouro
    ) 
    REFERENCES TIPO_LOGRADOURO 
    ( 
     id_tipo_logradouro
    ) 
;



-- Relatório do Resumo do Oracle SQL Developer Data Modeler: 
-- 
-- CREATE TABLE                             9
-- CREATE INDEX                             0
-- ALTER TABLE                             19
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           0
-- ALTER TRIGGER                            0
-- CREATE COLLECTION TYPE                   0
-- CREATE STRUCTURED TYPE                   0
-- CREATE STRUCTURED TYPE BODY              0
-- CREATE CLUSTER                           0
-- CREATE CONTEXT                           0
-- CREATE DATABASE                          0
-- CREATE DIMENSION                         0
-- CREATE DIRECTORY                         0
-- CREATE DISK GROUP                        0
-- CREATE ROLE                              0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE SEQUENCE                          0
-- CREATE MATERIALIZED VIEW                 0
-- CREATE MATERIALIZED VIEW LOG             0
-- CREATE SYNONYM                           0
-- CREATE TABLESPACE                        0
-- CREATE USER                              0
-- 
-- DROP TABLESPACE                          0
-- DROP DATABASE                            0
-- 
-- REDACTION POLICY                         0
-- TSDP POLICY                              0
-- 
-- ORDS DROP SCHEMA                         0
-- ORDS ENABLE SCHEMA                       0
-- ORDS ENABLE OBJECT                       0
-- 
-- ERRORS                                   0
-- WARNINGS                                 0
