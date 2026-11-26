import { Fornecedor } from "../models/Fornecedor.js";
import { Telefone } from "../models/Telefone.js";
import { EnderecoFornecedor } from "../models/EnderecoFornecedor.js";
import { SearchContext } from "../strategy/SearchContext.js";
import {
    CodigoSearchStrategy,
    RazaoSocialSearchStrategy,
    NomeFantasiaSearchStrategy,
    CnpjSearchStrategy,
    CidadeSearchStrategy,
    EstadoSearchStrategy,
    StatusSearchStrategy
} from "../strategy/strategies/FornecedorSearchStrategies.js";

const USUARIO_PADRAO = "Administrador do Sistema";

export class FornecedorFacade {
    constructor(repository, dominioDAO, logDAO, historicoDAO) {
        this.repository = repository;
        this.dominioDAO = dominioDAO;
        this.logDAO = logDAO;
        this.historicoDAO = historicoDAO;
        this.searchContext = new SearchContext([
            new CodigoSearchStrategy(),
            new RazaoSocialSearchStrategy(),
            new NomeFantasiaSearchStrategy(),
            new CnpjSearchStrategy(),
            new CidadeSearchStrategy(),
            new EstadoSearchStrategy(),
            new StatusSearchStrategy()
        ]);
    }

    #toDto(fornecedor) {
        return {
            codigo: fornecedor.getCodigo(),
            razaoSocial: fornecedor.getRazaoSocial(),
            nomeFantasia: fornecedor.getNomeFantasia(),
            cnpj: fornecedor.getCnpj(),
            email: fornecedor.getEmail(),
            status: fornecedor.getStatus(),
            tipoTelefone: fornecedor.getTelefone().getTipo(),
            ddd: fornecedor.getTelefone().getDdd(),
            numeroTelefone: fornecedor.getTelefone().getNumero(),
            tipoLogradouro: fornecedor.getEndereco().getTipoLogradouro(),
            logradouro: fornecedor.getEndereco().getLogradouro(),
            numeroEndereco: fornecedor.getEndereco().getNumero(),
            complemento: fornecedor.getEndereco().getComplemento(),
            bairro: fornecedor.getEndereco().getBairro(),
            cep: fornecedor.getEndereco().getCep(),
            cidade: fornecedor.getEndereco().getCidade(),
            estado: fornecedor.getEndereco().getEstado(),
            pais: fornecedor.getEndereco().getPais()
        };
    }

    async #resolverIds(dados) {
        const tipoTel = await this.dominioDAO.findTipoTelefoneByDescricao(dados.tipoTelefone);
        const tipoLog = await this.dominioDAO.findTipoLogradouroByDescricao(dados.tipoLogradouro);
        const pais = await this.dominioDAO.findPaisByNome(dados.pais || "Brasil");
        const estado = await this.dominioDAO.findEstadoBySigla(dados.estado);

        if (!tipoTel || !tipoLog || !pais || !estado) {
            throw new Error("Domínio inválido: verifique tipo de telefone, logradouro, estado ou país.");
        }

        return {
            id_tipo_telefone: tipoTel.id_tipo_telefone,
            id_tipo_logradouro: tipoLog.id_tipo_logradouro,
            id_pais: pais.id_pais,
            id_estado: estado.id_estado
        };
    }

    #validarObrigatorios(dados) {
        const obrigatorios = [
            ["razaoSocial", "Razão Social"],
            ["nomeFantasia", "Nome Fantasia"],
            ["cnpj", "CNPJ"],
            ["email", "E-mail"],
            ["tipoTelefone", "Tipo de Telefone"],
            ["ddd", "DDD"],
            ["numeroTelefone", "Número do Telefone"],
            ["tipoLogradouro", "Tipo de Logradouro"],
            ["logradouro", "Logradouro"],
            ["numeroEndereco", "Número"],
            ["bairro", "Bairro"],
            ["cep", "CEP"],
            ["cidade", "Cidade"],
            ["estado", "Estado"],
            ["pais", "País"]
        ];

        const pendentes = obrigatorios
            .filter(([campo]) => !String(dados[campo] ?? "").trim())
            .map(([, label]) => label);

        if (pendentes.length) {
            return { valido: false, pendentes };
        }

        return { valido: true, pendentes: [] };
    }

    #criarEntidade(dados, status = "ATIVO") {
        const telefone = new Telefone(dados.tipoTelefone, dados.ddd, dados.numeroTelefone);
        const endereco = new EnderecoFornecedor(
            dados.tipoLogradouro,
            dados.logradouro,
            dados.numeroEndereco,
            dados.complemento || null,
            dados.bairro,
            dados.cep,
            dados.cidade,
            dados.estado,
            dados.pais || "Brasil"
        );

        return new Fornecedor(
            dados.codigo || null,
            dados.razaoSocial,
            dados.nomeFantasia,
            dados.cnpj,
            dados.email,
            status,
            telefone,
            endereco
        );
    }

    async #registrarLog(codigo, tipo, usuario, payload) {
        await this.logDAO.insert({
            cod_fornecedor: codigo,
            tipo_operacao: tipo,
            usuario_responsavel: usuario || USUARIO_PADRAO,
            dados_alterados: JSON.stringify(payload)
        });
    }

    async buscar(filtros = {}) {
        const lista = (await this.repository.listar()).map((f) => this.#toDto(f));
        return this.searchContext.filtrar(lista, filtros);
    }

    async obterPorCodigo(codigo) {
        const fornecedor = await this.repository.obterPorCodigo(codigo);
        if (!fornecedor) {
            return null;
        }
        return this.#toDto(fornecedor);
    }

    async cadastrar(dados, usuario = USUARIO_PADRAO) {
        const validacao = this.#validarObrigatorios(dados);
        if (!validacao.valido) {
            return { sucesso: false, codigoErro: "E1", campos: validacao.pendentes };
        }

        const existente = await this.repository.buscarPorCnpj(dados.cnpj);
        if (existente) {
            return {
                sucesso: false,
                codigoErro: "E2",
                mensagem: `CNPJ já cadastrado para o fornecedor ${existente.getCodigo()}.`
            };
        }

        const entidade = this.#criarEntidade(dados, "ATIVO");
        const ids = await this.#resolverIds(dados);
        const salvo = await this.repository.inserir(entidade, ids);
        const dto = this.#toDto(salvo);

        await this.#registrarLog(dto.codigo, "INCLUSAO", usuario, dto);

        return {
            sucesso: true,
            mensagem: `Fornecedor cadastrado com sucesso. Código: ${dto.codigo}.`,
            fornecedor: dto
        };
    }

    async alterar(codigo, dados, usuario = USUARIO_PADRAO) {
        const atual = await this.repository.obterPorCodigo(codigo);
        if (!atual) {
            return { sucesso: false, mensagem: "Fornecedor não encontrado." };
        }

        const validacao = this.#validarObrigatorios(dados);
        if (!validacao.valido) {
            return { sucesso: false, codigoErro: "E1", campos: validacao.pendentes };
        }

        const outro = await this.repository.buscarPorCnpj(dados.cnpj);
        if (outro && outro.getCodigo() !== codigo) {
            return {
                sucesso: false,
                codigoErro: "E2",
                mensagem: `CNPJ já cadastrado para o fornecedor ${outro.getCodigo()}.`
            };
        }

        const entidade = this.#criarEntidade({ ...dados, codigo }, atual.getStatus());
        const ids = await this.#resolverIds(dados);
        const salvo = await this.repository.atualizar(codigo, entidade, ids);
        const dto = this.#toDto(salvo);

        await this.#registrarLog(codigo, "ALTERACAO", usuario, dto);

        return { sucesso: true, mensagem: "Fornecedor alterado com sucesso.", fornecedor: dto };
    }

    async inativar(codigo, categoriaId, justificativa, usuario = USUARIO_PADRAO) {
        if (!categoriaId || !String(justificativa || "").trim()) {
            return { sucesso: false, codigoErro: "E4", mensagem: "Informe categoria e justificativa." };
        }

        const fornecedor = await this.repository.obterPorCodigo(codigo);
        if (!fornecedor) {
            return { sucesso: false, mensagem: "Fornecedor não encontrado." };
        }

        if (fornecedor.getStatus() !== "ATIVO") {
            return { sucesso: false, mensagem: "Somente fornecedores ATIVOS podem ser inativados." };
        }

        await this.repository.alterarStatus(codigo, "INATIVO");

        await this.historicoDAO.insert({
            status_anterior: "ATIVO",
            status_novo: "INATIVO",
            justificativa,
            usuario_responsavel: usuario || USUARIO_PADRAO,
            cod_fornecedor: codigo,
            id_categoria_ativacao: 1,
            id_categoria_inativacao: Number(categoriaId)
        });

        const dto = this.#toDto(await this.repository.obterPorCodigo(codigo));
        await this.#registrarLog(codigo, "INATIVACAO", usuario, dto);

        return { sucesso: true, mensagem: "Fornecedor inativado com sucesso.", fornecedor: dto };
    }

    async ativar(codigo, categoriaId, justificativa, usuario = USUARIO_PADRAO) {
        if (!categoriaId || !String(justificativa || "").trim()) {
            return { sucesso: false, codigoErro: "E4", mensagem: "Informe categoria e justificativa." };
        }

        const fornecedor = await this.repository.obterPorCodigo(codigo);
        if (!fornecedor) {
            return { sucesso: false, mensagem: "Fornecedor não encontrado." };
        }

        if (fornecedor.getStatus() !== "INATIVO") {
            return { sucesso: false, mensagem: "Somente fornecedores INATIVOS podem ser ativados." };
        }

        await this.repository.alterarStatus(codigo, "ATIVO");

        await this.historicoDAO.insert({
            status_anterior: "INATIVO",
            status_novo: "ATIVO",
            justificativa,
            usuario_responsavel: usuario || USUARIO_PADRAO,
            cod_fornecedor: codigo,
            id_categoria_ativacao: Number(categoriaId),
            id_categoria_inativacao: 1
        });

        const dto = this.#toDto(await this.repository.obterPorCodigo(codigo));
        await this.#registrarLog(codigo, "ATIVACAO", usuario, dto);

        return { sucesso: true, mensagem: "Fornecedor ativado com sucesso.", fornecedor: dto };
    }

    async listarDominios() {
        return {
            estados: await this.dominioDAO.listEstados(),
            paises: await this.dominioDAO.listPaises(),
            tiposTelefone: await this.dominioDAO.listTiposTelefone(),
            tiposLogradouro: await this.dominioDAO.listTiposLogradouro(),
            categoriasInativacao: await this.dominioDAO.listCategoriasInativacao(),
            categoriasAtivacao: await this.dominioDAO.listCategoriasAtivacao()
        };
    }

    obterUsuarioAutenticado() {
        return { nome: USUARIO_PADRAO, perfil: "Administrador" };
    }
}