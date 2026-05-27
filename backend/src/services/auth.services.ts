import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRepo = AppDataSource.getRepository(User);

const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: string,
) => {
  const existUser = await userRepo.findOne({ where: { email } });
  if (existUser) {
    throw new Error("User already exists");
  }
  const hashPass = await bcrypt.hash(password, 10);
  const user = await userRepo.create({
    name,
    email,
    password: hashPass,
    role,
  });
  await userRepo.save(user);

  const token = jwt.sign({ id: user.id, role: user.role }, "kjhfkjwehfiuwu", {
    expiresIn: "7d",
  });
  return {
    user,
    token,
  };
};

const loginUser = async (email: string, password: string) => {
  const user = await userRepo.findOne({ where: { email } });
  if (!user) {
    throw new Error("User does not exist");
  }
  const matchPass = bcrypt.compare(password, user.password);
  if (!matchPass) {
    throw new Error("Incorrect Password");
  }

  const token = jwt.sign({ id: user.id, role: user.role }, "kjhsfhuhiuqw", {
    expiresIn: "7d",
  });
  return {
    user,
    token,
  };
};

export const authServices = {
  registerUser,
  loginUser
};
