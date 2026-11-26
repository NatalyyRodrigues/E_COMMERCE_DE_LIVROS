export class FornecedorController {
    constructor(facade) {
        this.facade = facade;
    }

    buscar = async (req, res) => {
        try {
            const filtros = {
                codigo: req.query.codigo,
                razaoSocial: req.query.razaoSocial,
                nomeFantasia: req.query.nomeFantasia,
                cnpj: req.query.cnpj,
                cidade: req.query.cidade,
                estado: req.query.estado,
                status: req.query.status || "todos"
            };

            const inicio = Date.now();
            const resultado = await this.facade.buscar(filtros);
            const duracaoMs = Date.now() - inicio;

            res.json({ itens: resultado, total: resultado.length, duracaoMs });
        } catch (erro) {
            res.status(500).json({ mensagem: erro.message });
        }
    };

    obter = async (req, res) => {
        try {
            const fornecedor = await this.facade.obterPorCodigo(req.params.codigo);
            if (!fornecedor) {
                return res.status(404).json({ mensagem: "Fornecedor não encontrado." });
            }
            return res.json(fornecedor);
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }
    };

    criar = async (req, res) => {
        try {
            const resposta = await this.facade.cadastrar(req.body, req.body.usuario);
            if (!resposta.sucesso) {
                return res.status(400).json(resposta);
            }
            return res.status(201).json(resposta);
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }
    };

    atualizar = async (req, res) => {
        try {
            const resposta = await this.facade.alterar(req.params.codigo, req.body, req.body.usuario);
            if (!resposta.sucesso) {
                return res.status(400).json(resposta);
            }
            return res.json(resposta);
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }
    };

    inativar = async (req, res) => {
        try {
            const { categoriaId, justificativa, usuario } = req.body;
            const resposta = await this.facade.inativar(req.params.codigo, categoriaId, justificativa, usuario);
            if (!resposta.sucesso) {
                return res.status(400).json(resposta);
            }
            return res.json(resposta);
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }
    };

    ativar = async (req, res) => {
        try {
            const { categoriaId, justificativa, usuario } = req.body;
            const resposta = await this.facade.ativar(req.params.codigo, categoriaId, justificativa, usuario);
            if (!resposta.sucesso) {
                return res.status(400).json(resposta);
            }
            return res.json(resposta);
        } catch (erro) {
            return res.status(500).json({ mensagem: erro.message });
        }
    };

    dominios = async (_req, res) => {
        try {
            res.json(await this.facade.listarDominios());
        } catch (erro) {
            res.status(500).json({ mensagem: erro.message });
        }
    };

    usuario = (_req, res) => {
        res.json(this.facade.obterUsuarioAutenticado());
    };
}