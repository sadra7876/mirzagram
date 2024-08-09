import express from "express";
import cors from "cors";
import { profileRoutes } from "./feature/profile/routes/profile.route";
import { authRoutes } from "./feature/auth/routes/auth.routes";
import { setupSwagger } from "./swagger";

export const api = express();
api.use(cors());
api.use(express.json());
setupSwagger(api);

api.use("/auth", authRoutes);
api.use("/profile", profileRoutes);
