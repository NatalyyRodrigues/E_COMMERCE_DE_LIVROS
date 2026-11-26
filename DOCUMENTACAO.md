# E-commerce de Livros — CDU01 Manter Cadastro de Fornecedores

## 1. Visão geral

Este projeto implementa o caso de uso **CDU01 — Manter Cadastro de Fornecedores**, conforme a especificação FATEC e a matriz de rastreabilidade (`Matriz_Rastreabilidade_ECOMMERCE.xlsx`).

A solução cobre **consulta, inclusão, alteração, visualização, inativação e ativação** de fornecedores, com persistência real, validações de negócio e registro de log/histórico.

## 2. Como executar

```bash
cd E_COMMERCE_DE_LIVROS/backend
npm install
npm start
```

Acesse: `http://localhost:3000/TelaBusca.html`

> O backend persiste no **Oracle Database** (mesmas tabelas dos scripts `database/Scripts_DDL/`). Configure `backend/.env` a partir de `backend/oracle.env.sample` com usuário, senha e *connect string* iguais ao SQL Developer.

### Conectar ao Oracle

1. Execute no SQL Developer: `ddl_fornecedor.sql` e depois `dominios_fornecedor.sql`.
2. Crie `backend/.env` (copie `oracle.env.sample`).
3. Use o mesmo usuário/senha/service name da conexão **Oracle_Local_21c** (ex.: `localhost:1521/XEPDB1`).
4. Senhas com `@` ou `#` no `.env` devem ir **entre aspas**: `ORACLE_PASSWORD="Nataly@2205"`.
4. `npm start` na raiz ou em `backend/`.

**Pré-requisito Node:** driver `oracledb` — no Windows pode ser necessário o [Oracle Instant Client](https://www.oracle.com/database/technologies/instant-client/downloads.html) no PATH.

## 3. Estrutura do projeto (MVC)

| Camada | Pasta | Responsabilidade |
|--------|-------|------------------|
| **View** | `view/` | Telas HTML (Bootstrap) — protótipos 11.1 a 11.4 |
| **Controller (front)** | `controller/` | Orquestra eventos de tela e chama serviços |
| **Model/Serviço (front)** | `services/` | Cliente HTTP da API (`fornecedorService`, `api`) |
| **Controller (back)** | `backend/controllers/` | Endpoints REST |
| **Model (domínio)** | `backend/models/` | Entidades `Fornecedor`, `Telefone`, `EnderecoFornecedor` |
| **Persistência** | `backend/dao/`, `backend/repository/` | Acesso a dados |
| **Negócio** | `backend/facade/` | Regras RN/RNF e orquestração |
| **Consulta** | `backend/strategy/` | Filtros combinados (RF0085 / P1.1) |
| **Criação de dependências** | `backend/factory/` | `RepositoryFactory` |

## 4. Padrões de projeto aplicados

### MVC
- **Front-end:** `view` + `controller` + `services` (modelo de comunicação).
- **Back-end:** `routes` → `controllers` → `facade` → `repository` → `dao`.

### DAO (Data Access Object)
Classes em `backend/dao/` encapsulam SQL:
- `FornecedorDAO`
- `DominioDAO`
- `LogTransacaoDAO` (RNF0012)
- `HistoricoStatusDAO` (RN0084/RN0085)

### Repository
- Interface: `repository/IFornecedorRepository.js`
- Implementação: `repository/FornecedorRepository.js`
- Converte linhas do banco em objetos de domínio.

### Strategy (`ISearchStrategy`)
Cada filtro de busca é uma estratégia (`CodigoSearchStrategy`, `CnpjSearchStrategy`, …).
`SearchContext` aplica todas as estratégias em conjunto (P1.1).

### Facade
`facade/FornecedorFacade.js` concentra:
- Validações E1/E2/E4
- Geração de código (RNF0081)
- Log de transação (RNF0012)
- Inativação/ativação com histórico

### Factory
`factory/RepositoryFactory.js` monta DAO + Repository + Facade, evitando acoplamento nas rotas.

## 5. API REST (CRUD)

| Método | Endpoint | Operação |
|--------|----------|----------|
| GET | `/api/fornecedores?...` | Consulta (RF0085) |
| GET | `/api/fornecedores/:codigo` | Consulta pontual (A2) |
| POST | `/api/fornecedores` | Inclusão (RF0081) |
| PUT | `/api/fornecedores/:codigo` | Alteração (RF0082) |
| POST | `/api/fornecedores/:codigo/inativar` | Inativação (RF0083) |
| POST | `/api/fornecedores/:codigo/ativar` | Ativação (RF0084) |
| GET | `/api/fornecedores/dominios` | Domínios (RNF0013) |

## 6. Rastreabilidade (principais itens da matriz)

| ID | Implementação |
|----|----------------|
| RF0081–RF0085 | Endpoints e telas de cadastro/consulta/status |
| RN0081/RN0082 | Validação de obrigatórios no `FornecedorFacade` |
| RN0083 | Verificação de CNPJ único (E2) |
| RN0084/RN0085 | Categoria + justificativa na tela `AtivacaoDesativacao.html` |
| RNF0012 | Tabela `fornecedor_log_transacao` + `LogTransacaoDAO` |
| RNF0013 | Seed/domínios em `backend/data/seed.sql` e `dominios_fornecedor.sql` |
| RNF0081 | Geração automática de código `F0001`, `F0002`, … |

## 7. Problemas encontrados na entrega original e correções

1. **Sem back-end/API** — apenas HTML e mock; CRUD não persistia.
2. **`fornecedoresMock.js` incompleto** — faltavam dados para visualizar/alterar (A2).
3. **`EnderecoFornecedor.js` vazio** — classe de domínio inexistente.
4. **`package.json` incorreto** dentro de `backend/models/`.
5. **Fluxos E1, E2, E4** — só `alert()` genérico, sem validação de negócio.
6. **P3 usuário autenticado** — campo vazio nas telas.
7. **CA05** — botão **Novo** não era desabilitado ao alterar parâmetros sem nova busca.
8. **P1.3 / E3** — colunas cidade/estado unificadas; mensagem de “não encontrado” incompleta.
9. **`ResultadoBusca.html` com HTML quebrado** — tags não fechadas.
10. **Ativação/Inativação** — categorias fixas no HTML, sem persistência nem histórico.
11. **A1 visualizar** — campo **status** ausente no formulário.
12. **P4 pré-preenchimento de CNPJ** — não aplicava CNPJ da busca no modo Novo.

## 8. Fluxo de telas (caso de uso)

1. `TelaBusca.html` → informa filtros → `ResultadoBusca.html`
2. Seleção de registro → Visualizar / Alterar / Inativar / Ativar
3. `CadastroFornecedor.html` → inclusão ou manutenção cadastral
4. `AtivacaoDesativacao.html` → mudança de status com categoria e justificativa

## 9. Autores e etapa

Etapa 2 — Nataly Gabriely e Débora Miranda.

Documentação e refatoração arquitetural: novembro/2026.