import { IUser, IUserRequest } from "../interfaces/users";

import AppDataSource from "../data-source";
import { Users } from "../entities/user.entity";
import * as bcrypt from "bcryptjs";

const criarUsuarioService = async ({
  name,
  email,
  password,
  isAdm,
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(Users);
  const users = await userRepository.find();

  const emailAlreadyExists = users.find((user) => user.email === email);

  if (emailAlreadyExists) {
    throw new Error("Email already exists");
  }
  const passwordHashed = await bcrypt.hash(password, 10);
  const newUser = new Users();

  newUser.name = name;
  newUser.email = email;
  newUser.password = passwordHashed;
  newUser.isAdm = isAdm;

  userRepository.create(newUser);
  await userRepository.save(newUser);

  return newUser;
};

export default criarUsuarioService;
