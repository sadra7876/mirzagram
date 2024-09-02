import { ProfileId } from "@CommonTypes/profile.type";
import { handleRequest } from "@utils/handle-request";
import { ApiSuccess } from "@utils/http-response";
import { notificationService } from "dependencies";
import { Router } from "express";
import { authMiddleware } from "middlewares/auth.middleware";

export const notificationRoutes = Router();
notificationRoutes.use(authMiddleware);

notificationRoutes.get("/", (req, res) => {
  handleRequest(res, async () => {
    const result = await notificationService.getNotifications(
      req.subject as unknown as ProfileId
    );
    return new ApiSuccess(result);
  });
});
