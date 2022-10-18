import { Request, Response } from "express";
import loginService from "../services/login.services";
import AppDataSource from "../data-source";
import { Users } from "../entities/user.entity";
import * as bcrypt from "bcryptjs";
const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const repository = AppDataSource.getRepository(Users);
    const users = await repository.find();
    const verify = users.find((user) => user.email === email);
    if (!verify) {
      return res.status(403).json({ message: "Email ou senha inválidos" });
    }
    const verifyPassword = bcrypt.compareSync(password, verify.password);
    if (!verifyPassword) {
      return res.status(403).json({ message: "Email o senha inválidos" });
    }

    const { isAdm, id } = verify;
    const authLogin = await loginService(isAdm, id);
    return res.status(200).json({ token: authLogin });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};
export default loginController;
