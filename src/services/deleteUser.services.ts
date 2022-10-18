import AppDataSource from "../data-source";
import { Users } from "../entities/user.entity";
import { IDeleteReturn, IUser } from "../interfaces/users";

const deletaUser = async (
  id: string
): Promise<Users | Array<string | number>> => {
  const repository = AppDataSource.getRepository(Users);
  const findUser = await repository.findOneBy({
    id,
  });
  if (!findUser) {
    return [404, "user not found"];
  }
  console.log(!findUser.isActive);
  if (findUser.isActive === false) {
    return [400, "usuário já deletado"];
  }
  await repository.update(id, {
    isActive: false,
  });
  const user = await repository.findOneBy({
    id,
  });
  console.log(findUser);
  return user!;
};
export default deletaUser;
