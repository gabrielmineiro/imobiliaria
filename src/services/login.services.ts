import AppDataSource from "../data-source";
import jwt from "jsonwebtoken";
const loginService = async (isAdm: boolean, id: string) => {
  const token = jwt.sign({ isAdm: isAdm, id: id }, "SECRET_KEY", {
    expiresIn: "24h",
  });
  return token;
};
export default loginService;
