import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ messsage: "No Token Provided" });
    }

    const decode = jwt.verify(token, "kljsfkljkajskfhwei");

    req.user = decode;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
