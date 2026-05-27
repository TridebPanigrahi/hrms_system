import { Request, Response } from "express";
import { authServices } from "../services/auth.services";

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const data = await authServices.registerUser(name, email, password, role);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await authServices.loginUser(email, password);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const authController = {
  register,
  login,
};
