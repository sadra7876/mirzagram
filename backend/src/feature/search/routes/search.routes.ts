import { Router } from "express";
import { authMiddleware } from "middlewares/auth.middleware";

export const searchRoutes = Router();
searchRoutes.use(authMiddleware);
