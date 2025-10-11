import { Router } from "express";
import {
  registerController,
} from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/register", registerController);
//authRoutes.post("/login", loginController);

export default authRoutes;