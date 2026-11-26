import { fornecedorService } from "./fornecedorService.js";

export async function exibirUsuarioAutenticado(elementId = "usuarioLogado") {
    const alvo = document.getElementById(elementId);
    if (!alvo) {
        return;
    }

    try {
        const usuario = await fornecedorService.usuario();
        alvo.textContent = `${usuario.nome} — ${usuario.perfil}`;
    } catch {
        alvo.textContent = "Administrador do Sistema — Administrador";
    }
}