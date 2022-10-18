import { Request, Response } from "express";
import listarUsuariosService from "../services/getUsers.services";

const listarUsuariosController = async (req: Request, res: Response) => {
  try {
    const users = await listarUsuariosService();
    return res.status(200).json(users);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};
export default listarUsuariosController;
