import express from "express";
import cors from "cors";
import { authMiddleware, AuthRequest } from "./middlewares/auth.middleware";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/profile", authMiddleware, (req: AuthRequest, res) => {
  res.json({
    message: "Protected Route",
    user: req.user,
  });
});

app.use("/api/auth", authRoutes);

export default app;
