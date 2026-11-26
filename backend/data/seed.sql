-- Domínios (RNF0013) + fornecedores de demonstração

INSERT OR IGNORE INTO pais (id_pais, nome) VALUES (1, 'Brasil');

INSERT OR IGNORE INTO estado (id_estado, sigla, nome, id_pais) VALUES
(1,'AC','Acre',1),(2,'AL','Alagoas',1),(3,'AP','Amapá',1),(4,'AM','Amazonas',1),
(5,'BA','Bahia',1),(6,'CE','Ceará',1),(7,'DF','Distrito Federal',1),(8,'ES','Espírito Santo',1),
(9,'GO','Goiás',1),(10,'MA','Maranhão',1),(11,'MT','Mato Grosso',1),(12,'MS','Mato Grosso do Sul',1),
(13,'MG','Minas Gerais',1),(14,'PA','Pará',1),(15,'PB','Paraíba',1),(16,'PR','Paraná',1),
(17,'PE','Pernambuco',1),(18,'PI','Piauí',1),(19,'RJ','Rio de Janeiro',1),(20,'RN','Rio Grande do Norte',1),
(21,'RS','Rio Grande do Sul',1),(22,'RO','Rondônia',1),(23,'RR','Roraima',1),(24,'SC','Santa Catarina',1),
(25,'SP','São Paulo',1),(26,'SE','Sergipe',1),(27,'TO','Tocantins',1);

INSERT OR IGNORE INTO tipo_telefone (id_tipo_telefone, descricao) VALUES
(1,'Comercial'),(2,'Celular'),(3,'Residencial');

INSERT OR IGNORE INTO tipo_logradouro (id_tipo_logradouro, descricao) VALUES
(1,'Rua'),(2,'Avenida'),(3,'Travessa');

INSERT OR IGNORE INTO categoria_inativ_fornecedor (id_categoria_inativacao, descricao) VALUES
(1,'Comercial'),(2,'Administrativo');

INSERT OR IGNORE INTO categoria_ativ_fornecedor (id_categoria_ativacao, descricao) VALUES
(1,'Comercial'),(2,'Administrativo');

INSERT OR IGNORE INTO fornecedor (
    cod_fornecedor, razao_social, nome_fantasia, cnpj, email, status,
    ddd, numero_telefone, logradouro, numero_endereco, complemento, bairro, cep, cidade,
    id_tipo_telefone, id_tipo_logradouro, id_pais, id_estado
) VALUES
('F0003','Leitura Distribuidora Ltda','Leitura Livros','11.222.333/0001-44','contato@leituralivros.com.br','ATIVO',
 '11','987654321','das Flores','100','Sala 2','Centro','01310100','São Paulo',1,2,1,25),
('F0007','Casa da leitura Editorial S.A','Casa Editorial','22.333.444/0001-55','editorial@casaleitura.com.br','ATIVO',
 '19','345678901','Brasil','500',NULL,'Jardim Proença','13087001','Campinas',1,2,1,25),
('F0012','Boa Leitura Comércio Ltda','Boa Leitura','33.444.555/0001-66','vendas@boaleitura.com.br','INATIVO',
 '41','998877665','XV de Novembro','200','Loja 3','Centro','80020300','Curitiba',2,1,1,16);