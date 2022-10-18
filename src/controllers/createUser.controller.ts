import { Request, Response } from "express";
import { IUserRequest } from "../interfaces/users";
import criarUsuarioService from "../services/createUser.services";
import { instanceToPlain } from "class-transformer";

const criarUsuarioController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, isAdm }: IUserRequest = req.body;
    const newUser = await criarUsuarioService({ name, email, password, isAdm });
    return res.status(201).json(instanceToPlain(newUser));
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};
export default criarUsuarioController;
