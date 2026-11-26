import { ISearchStrategy } from "../ISearchStrategy.js";

function normalize(text) {
    return (text ?? "").toString().trim().toLowerCase();
}

export class CodigoSearchStrategy extends ISearchStrategy {
    matches(fornecedor, filtros) {
        if (!filtros.codigo) return true;
        return normalize(fornecedor.codigo).includes(normalize(filtros.codigo));
    }
}

export class RazaoSocialSearchStrategy extends ISearchStrategy {
    matches(fornecedor, filtros) {
        if (!filtros.razaoSocial) return true;
        return normalize(fornecedor.razaoSocial).includes(normalize(filtros.razaoSocial));
    }
}

export class NomeFantasiaSearchStrategy extends ISearchStrategy {
    matches(fornecedor, filtros) {
        if (!filtros.nomeFantasia) return true;
        return normalize(fornecedor.nomeFantasia).includes(normalize(filtros.nomeFantasia));
    }
}

export class CnpjSearchStrategy extends ISearchStrategy {
    matches(fornecedor, filtros) {
        if (!filtros.cnpj) return true;
        return fornecedor.cnpj.includes(filtros.cnpj.trim());
    }
}

export class CidadeSearchStrategy extends ISearchStrategy {
    matches(fornecedor, filtros) {
        if (!filtros.cidade) return true;
        return normalize(fornecedor.cidade).includes(normalize(filtros.cidade));
    }
}

export class EstadoSearchStrategy extends ISearchStrategy {
    matches(fornecedor, filtros) {
        if (!filtros.estado) return true;
        return normalize(fornecedor.estado) === normalize(filtros.estado);
    }
}

export class StatusSearchStrategy extends ISearchStrategy {
    matches(fornecedor, filtros) {
        const status = normalize(filtros.status || "todos");
        if (status === "todos") return true;
        return normalize(fornecedor.status) === status;
    }
}