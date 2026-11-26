import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { initializeDatabase } from "./config/database.js";
import { RepositoryFactory } from "./factory/RepositoryFactory.js";
import { FornecedorController } from "./controllers/FornecedorController.js";
import { createFornecedorRoutes } from "./routes/fornecedorRoutes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

async function bootstrap() {
    await initializeDatabase();

    const app = express();
    app.use(cors());
    app.use(express.json());

    const facade = RepositoryFactory.createFornecedorFacade();
    const controller = new FornecedorController(facade);
    app.use("/api/fornecedores", createFornecedorRoutes(controller));

    const viewPath = path.join(__dirname, "..", "view");
    app.use(express.static(viewPath));
    app.use("/controller", express.static(path.join(__dirname, "..", "controller")));
    app.use("/models", express.static(path.join(__dirname, "..", "models")));
    app.use("/services", express.static(path.join(__dirname, "..", "services")));

    app.get("/", (_req, res) => {
        res.redirect("/TelaBusca.html");
    });

    const server = app.listen(PORT, () => {
        console.log(`Servidor CDU01 em http://localhost:${PORT}`);
        console.log(`Tela de busca: http://localhost:${PORT}/TelaBusca.html`);
        console.log("Persistência: Oracle Database");
    });

    server.on("error", (err) => {
        if (err.code === "EADDRINUSE") {
            console.error(`Porta ${PORT} em uso. Feche a outra instância ou use: $env:PORT=3001; npm start`);
            process.exit(1);
        }
        throw err;
    });
}

bootstrap().catch((erro) => {
    console.error("Falha ao iniciar a API:", erro.message);
    process.exit(1);
});