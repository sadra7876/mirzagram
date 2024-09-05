import { ProfileId } from "@CommonTypes/profile.type";
import { handleRequest } from "@utils/handle-request";
import { ApiSuccess } from "@utils/http-response";
import { exploreService } from "dependencies";
import { Router } from "express";
import { authMiddleware } from "middlewares/auth.middleware";

export const exploreRoutes = Router();
exploreRoutes.use(authMiddleware);

exploreRoutes.get("/", (req, res) => {
  handleRequest(res, async () => {
    const profileId: ProfileId = Number(req.subject) as ProfileId;
    const page = parseInt(req.query.page as string) || 1;
    const pagelimit = parseInt(req.query.pagelimit as string) || 10;
    const result = await exploreService.getPosts(profileId, page, pagelimit);

    return new ApiSuccess(result);
  });
});
