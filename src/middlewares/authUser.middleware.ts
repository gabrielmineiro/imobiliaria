import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let token: any = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: "Esta requisição precisa de autorização" });
  }
  token = token.split(" ")[1];
  jwt.verify(token, "SECRET_KEY", (error: any, decoded: any) => {
    if (error instanceof Error) {
      res.status(403).json({
        message: "Invalid token",
      });
    }

    const adm = decoded.isAdm;
    if (!adm) {
      res.status(403).json({
        message: "Você precisa ser um administrador para acessar esse recurso",
      });
    }
  });
  next();
};
export default authMiddleware;
