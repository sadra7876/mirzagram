import express from "express";
import cors from "cors";
import { profileRoutes } from "feature/profile/routes/profile.routes";
import { authRoutes } from "./feature/auth/routes/auth.routes";
import { setupSwagger } from "./swagger";
import { storageRouter } from "@feature/storage/routes/storage.routes";
import path from "path";

export const api = express();
api.use(cors());
api.use(express.json());
setupSwagger(api); //
api.use("/cdn", express.static(path.resolve(process.cwd(), "uploads")));
api.use("/auth", authRoutes);
api.use("/profile", profileRoutes);

api.use("/upload", storageRouter);
