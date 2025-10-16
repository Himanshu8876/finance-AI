import { Router } from "express";
import {
  registerController,loginController
} from "../controllers/auth.controller";
import { googleAuthController } from "../controllers/googleAuthController";

const authRoutes = Router();

authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);
authRoutes.post("/google", googleAuthController);
export default authRoutes;