import { Request, Response } from "express";
import { Users } from "../entities/user.entity";
import deletaUserService from "../services/deleteUser.services";

const deletaUserController = async (req: Request, res: Response) => {
  let { id } = req.params;
  try {
    const userDeleted = await deletaUserService(id);
    const verifica = userDeleted instanceof Users;
    if (verifica) {
      return res.status(204).json(userDeleted);
    }
    return res
      .status(userDeleted[0] as number)
      .json({ message: userDeleted[1] });
  } catch (err) {
    if (err instanceof Error) {
      res.status(403).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};
export default deletaUserController;
