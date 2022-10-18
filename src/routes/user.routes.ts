import { Router } from "express";
import criarUsuarioController from "../controllers/createUser.controller";
import deletaUserController from "../controllers/deletaUser.controller";
import listarUsuariosController from "../controllers/getUsers.controller";
import atualizaUserController from "../controllers/updateUser.controller";
import authMiddleware from "../middlewares/authUser.middleware";

const router = Router();

router.post("", criarUsuarioController);
router.get("", authMiddleware, listarUsuariosController);
router.patch("/:id1", atualizaUserController);
router.delete("/:id", authMiddleware, deletaUserController);

export default router;
