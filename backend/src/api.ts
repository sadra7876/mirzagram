import { Router } from "express";
import { profileRoutes } from "@feature/profile/routes/profile.routes";
import { authRoutes } from "@feature/auth/routes/auth.routes";
import { storageRouter } from "@feature/storage/routes/storage.routes";
import { postRoutes } from "@feature/post/routes/post.routes";
import { followRoutes } from "@feature/follow/routes/follow.routes";
import { commentRoutes } from "@feature/comment/routes/comment.routes";
import { bookmarkRoutes } from "@feature/bookmark/routes/bookmark.routes";
import { notificationRoutes } from "@feature/notification/routes/notification.routes";
import { exploreRoutes } from "@feature/explore/routes/explore.routes";

export const api = Router();

api.use("/auth", authRoutes);
api.use("/profile", profileRoutes);
api.use("/upload", storageRouter);
api.use("/post", postRoutes);
api.use("/follow", followRoutes);
api.use("/comment", commentRoutes);
api.use("/bookmark", bookmarkRoutes);
api.use("/notification", notificationRoutes);
api.use("/explore", exploreRoutes);
api.get("/health", (req, res) => {
  res.status(200).send("OK");
});
