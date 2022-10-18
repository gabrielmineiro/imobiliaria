import AppDataSource from "../data-source";
import { Users } from "../entities/user.entity";
import { IUserUpdate } from "../interfaces/users";
import * as bcrypt from "bcryptjs";

const atualizaUserService = async (
  { name, email, password }: IUserUpdate,
  id: string
) => {
  const repository = AppDataSource.getRepository(Users);
  const findUser = await repository.findOneBy({
    id,
  });
  if (!findUser) {
    return "user not found";
  }
  await repository.update(id, {
    name: name ? name : findUser.name,
    email: email ? email : findUser.email,
    password: password ? await bcrypt.hash(password, 10) : findUser.password,
  });
  const user = await repository.findOneBy({
    id,
  });

  return user;
};
export default atualizaUserService;
