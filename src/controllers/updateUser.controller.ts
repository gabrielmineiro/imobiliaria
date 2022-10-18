import { Request, Response } from "express";
import { IUserUpdate } from "../interfaces/users";
import atualizaUserService from "../services/updateUser.services";
import jwt from "jsonwebtoken";

const atualizaUserController = async (req: Request, res: Response) => {
  const { name, email, password, isActive, isAdm, id }: IUserUpdate = req.body;
  let { id1 } = req.params;

  try {
    if (isActive !== undefined || isAdm !== undefined || id !== undefined) {
      throw new Error("Você inseriu dados que não podem ser atualizados");
    }
    let token: string | undefined = req.headers.authorization;
    token = token!.split(" ")[1];

    const idToken = jwt.verify(
      token,
      "SECRET_KEY",
      (error, decoded: any) => decoded.id
    );
    const adm = jwt.verify(
      token,
      "SECRET_KEY",
      (error, decoded: any) => decoded.isAdm
    );
    if (id !== idToken) {
      if (!adm!) {
        return res
          .status(401)
          .json({ message: "você não pode acessar esse recurso." });
      }
    }
    const userUpdate = await atualizaUserService(
      { name, email, password },
      id1
    );
    return res.status(200).json(userUpdate);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};
export default atualizaUserController;
