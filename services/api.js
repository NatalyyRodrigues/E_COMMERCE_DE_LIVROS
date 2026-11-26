function obterApiBase() {
    if (window.location.protocol === "file:") {
        return "http://localhost:3000/api";
    }
    return `${window.location.origin}/api`;
}

async function request(path, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
        const response = await fetch(`${obterApiBase()}${path}`, {
            headers: { "Content-Type": "application/json", ...(options.headers || {}) },
            signal: controller.signal,
            ...options
        });

        const body = await response.json().catch(() => ({}));

        if (!response.ok) {
            const erro = new Error(body.mensagem || body.message || "Falha na requisição");
            erro.detalhes = body;
            throw erro;
        }

        return body;
    } catch (erro) {
        if (erro.name === "AbortError") {
            throw new Error(
                "Tempo esgotado. Verifique se o servidor está rodando (npm start em backend) e se o Oracle está acessível."
            );
        }
        if (erro.message === "Failed to fetch" || erro.name === "TypeError") {
            throw new Error(
                "Não foi possível conectar à API. Execute npm start na pasta backend e acesse http://localhost:3000/TelaBusca.html"
            );
        }
        throw erro;
    } finally {
        clearTimeout(timeoutId);
    }
}

export const api = {
    get: (path) => request(path),
    post: (path, data) => request(path, { method: "POST", body: JSON.stringify(data) }),
    put: (path, data) => request(path, { method: "PUT", body: JSON.stringify(data) })
};