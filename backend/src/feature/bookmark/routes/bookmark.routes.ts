import { ProfileId } from "@CommonTypes/profile.type";
import { handleRequest } from "@utils/handle-request";
import { ApiSuccess } from "@utils/http-response";
import { bookmarkService } from "dependencies";
import { Router } from "express";
import { authMiddleware } from "middlewares/auth.middleware";
import { bookmarkRequestDTO } from "../dto/bookmark-request.dto";

export const bookmarkRoutes = Router();
bookmarkRoutes.use(authMiddleware);

bookmarkRoutes.get("/", (req, res) => {
  handleRequest(res, async () => {
    const result = await bookmarkService.getProfileBookmarks(
      req.subject as unknown as ProfileId
    );
    return new ApiSuccess(result);
  });
});

bookmarkRoutes.post("/", (req, res) => {
  handleRequest(res, async () => {
    const result = await bookmarkService.bookmarkPost(
      req.subject as unknown as ProfileId,
      bookmarkRequestDTO.parse(req.body)
    );
    return new ApiSuccess(result);
  });
});

bookmarkRoutes.delete("/", (req, res) => {
  handleRequest(res, async () => {
    const result = await bookmarkService.removeBookmark(
      req.subject as unknown as ProfileId,
      bookmarkRequestDTO.parse(req.body)
    );
    return new ApiSuccess(result);
  });
});
