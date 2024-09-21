import { ProfileId } from "@CommonTypes/profile.type";
import { handleRequest } from "@utils/handle-request";
import { ApiSuccess } from "@utils/http-response";
import { messageService } from "dependencies";
import { Router } from "express";
import { authMiddleware } from "middlewares/auth.middleware";

export const messageRoutes = Router();
messageRoutes.use(authMiddleware);

messageRoutes.get("/conversations", (req, res) => {
  handleRequest(res, async () => {
    const result = await messageService.getConversations(
      req.subject as unknown as ProfileId
    );
    return new ApiSuccess(result);
  });
});
