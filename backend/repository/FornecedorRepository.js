import { Fornecedor } from "../models/Fornecedor.js";
import { Telefone } from "../models/Telefone.js";
import { EnderecoFornecedor } from "../models/EnderecoFornecedor.js";
import { IFornecedorRepository } from "./IFornecedorRepository.js";

export class FornecedorRepository extends IFornecedorRepository {
    constructor(fornecedorDAO) {
        super();
        this.fornecedorDAO = fornecedorDAO;
    }

    #mapRowToDomain(row) {
        if (!row) {
            return null;
        }

        const telefone = new Telefone(row.tipo_telefone_desc, row.ddd, row.numero_telefone);
        const endereco = new EnderecoFornecedor(
            row.tipo_logradouro_desc,
            row.logradouro,
            row.numero_endereco,
            row.complemento,
            row.bairro,
            row.cep,
            row.cidade,
            row.estado_sigla,
            row.pais_nome
        );

        return new Fornecedor(
            row.cod_fornecedor,
            row.razao_social,
            row.nome_fantasia,
            row.cnpj,
            row.email,
            row.status,
            telefone,
            endereco
        );
    }

    #mapDomainToPersistence(fornecedor, ids) {
        return {
            razao_social: fornecedor.getRazaoSocial(),
            nome_fantasia: fornecedor.getNomeFantasia(),
            cnpj: fornecedor.getCnpj(),
            email: fornecedor.getEmail(),
            status: fornecedor.getStatus(),
            ddd: fornecedor.getTelefone().getDdd(),
            numero_telefone: fornecedor.getTelefone().getNumero(),
            logradouro: fornecedor.getEndereco().getLogradouro(),
            numero_endereco: fornecedor.getEndereco().getNumero(),
            complemento: fornecedor.getEndereco().getComplemento(),
            bairro: fornecedor.getEndereco().getBairro(),
            cep: fornecedor.getEndereco().getCep(),
            cidade: fornecedor.getEndereco().getCidade(),
            id_tipo_telefone: ids.id_tipo_telefone,
            id_tipo_logradouro: ids.id_tipo_logradouro,
            id_pais: ids.id_pais,
            id_estado: ids.id_estado
        };
    }

    async listar() {
        const rows = await this.fornecedorDAO.findAll();
        return rows.map((row) => this.#mapRowToDomain(row));
    }

    async obterPorCodigo(codigo) {
        return this.#mapRowToDomain(await this.fornecedorDAO.findByCodigo(codigo));
    }

    async buscarPorCnpj(cnpj) {
        const row = await this.fornecedorDAO.findByCnpj(cnpj);
        return row ? this.obterPorCodigo(row.cod_fornecedor) : null;
    }

    async inserir(fornecedor, ids) {
        const codigo = await this.fornecedorDAO.getNextCodigo();
        const payload = {
            cod_fornecedor: codigo,
            ...this.#mapDomainToPersistence(fornecedor, ids)
        };
        await this.fornecedorDAO.insert(payload);
        return this.obterPorCodigo(codigo);
    }

    async atualizar(codigo, fornecedor, ids) {
        const payload = this.#mapDomainToPersistence(fornecedor, ids);
        await this.fornecedorDAO.update(codigo, payload);
        return this.obterPorCodigo(codigo);
    }

    async alterarStatus(codigo, status) {
        await this.fornecedorDAO.updateStatus(codigo, status);
        return this.obterPorCodigo(codigo);
    }
}