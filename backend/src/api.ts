import express from "express";
import cors from "cors";
import { profileRoutes } from "feature/profile/routes/profile.routes";
import { authRoutes } from "./feature/auth/routes/auth.routes";
import { setupSwagger } from "./swagger";
import { storageRouter } from "@feature/storage/routes/storage.routes";
import path from "path";
import { postRoutes } from "@feature/post/routes/post.routes";
import { followRoutes } from "@feature/follow/routes/follow.routes";
import { commentRoutes } from "@feature/comment/routes/comment.routes";
import { bookmarkRoutes } from "@feature/bookmark/routes/bookmark.routes";

export const api = express();

api.use(cors());
api.use(express.json());
setupSwagger(api);

api.use("/cdn", express.static(path.resolve(process.cwd(), "uploads")));
api.use("/auth", authRoutes);
api.use("/profile", profileRoutes);
api.use("/upload", storageRouter);
api.use("/post", postRoutes);
api.use("/follow", followRoutes);
api.use("/comment", commentRoutes);
api.use("/bookmark", bookmarkRoutes);
