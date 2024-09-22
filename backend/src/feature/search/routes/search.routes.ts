import { ProfileId } from "@CommonTypes/profile.type";
import { handleRequest } from "@utils/handle-request";
import { ApiSuccess } from "@utils/http-response";
import { searchService } from "dependencies";
import { Router } from "express";
import { authMiddleware } from "middlewares/auth.middleware";

export const searchRoutes = Router();
searchRoutes.use(authMiddleware);

searchRoutes.get("/profiles", (req, res) => {
  handleRequest(res, async () => {
    const result = await searchService.searchProfiles(
      req.subject as unknown as ProfileId,
      req.query.query as string,
      parseInt(req.query.page as string) || 1,
      parseInt(req.query.pageSize as string) || 10
    );
    return new ApiSuccess(result);
  });
});

searchRoutes.get("/posts", (req, res) => {
  handleRequest(res, async () => {
    const result = await searchService.searchPost(
      req.query.query as string,
      parseInt(req.query.page as string) || 1,
      parseInt(req.query.pageSize as string) || 10
    );
    return new ApiSuccess(result);
  });
});
