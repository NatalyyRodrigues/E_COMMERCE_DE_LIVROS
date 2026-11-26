import { Router } from "express";

export function createFornecedorRoutes(controller) {
    const router = Router();

    router.get("/dominios", controller.dominios);
    router.get("/usuario", controller.usuario);
    router.get("/", controller.buscar);
    router.get("/:codigo", controller.obter);
    router.post("/", controller.criar);
    router.put("/:codigo", controller.atualizar);
    router.post("/:codigo/inativar", controller.inativar);
    router.post("/:codigo/ativar", controller.ativar);

    return router;
}