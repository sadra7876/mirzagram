import express from "express";
import { authRoutes } from "./feature/profile/routes/auth.routes";

export const api = express();

api.use("/auth", authRoutes);
