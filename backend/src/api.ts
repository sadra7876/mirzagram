import express from "express";
import { authRoutes } from "./feature/auth/routes/auth.routes";

export const api = express();

api.use("/auth", authRoutes);
