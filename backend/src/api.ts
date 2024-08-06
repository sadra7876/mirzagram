import express from "express";
import { profileRoutes } from "./feature/profile/routes/profile.route";
import { authRoutes } from "./feature/auth/routes/auth.routes";

export const api = express();
api.use(express.json());


api.use("/auth", authRoutes);
api.use("/profile", profileRoutes);
