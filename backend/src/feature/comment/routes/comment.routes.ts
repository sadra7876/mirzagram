import { ProfileId } from "@CommonTypes/profile.type";
import { handleRequest } from "@utils/handle-request";
import { ApiError, ApiSuccess } from "@utils/http-response";
import { commentService } from "dependencies";
import { Router } from "express";
import { authMiddleware } from "middlewares/auth.middleware";
import { strings } from "resources/strings";
import { createCommentRequestDTO } from "../dto/new-comment.dto";

export const commentRoutes = Router();
commentRoutes.use(authMiddleware);

commentRoutes.get("/:id", (req, res) => {
  handleRequest(res, async () => {
    const result = await commentService.getComment(
      req.subject as unknown as ProfileId,
      req.params.id
    );
    return new ApiSuccess(result);
  });
});

commentRoutes.post("/", (req, res) => {
  handleRequest(res, async () => {
    const result = await commentService.createComment(
      req.subject as unknown as ProfileId,
      createCommentRequestDTO.parse(req.body)
    );
    return new ApiSuccess(result, [strings.COMMENT_ADDED_SUCCESSFULLY]);
  });
});

commentRoutes.get("/", (req, res) => {
  handleRequest(res, async () => {
    const postId = req.query.postId as string;
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    if (postId) {
      const result = await commentService.getCommentsForPost(
        req.subject as unknown as ProfileId,
        postId,
        page,
        pageSize
      );
      return new ApiSuccess(result);
    }
    return new ApiError(400, undefined, [strings.POST_ID_NOT_PROVIDED]);
  });
});

commentRoutes.post("/:commentId/like", (req, res) => {
  handleRequest(res, async () => {
    const result = await commentService.likeComment(
      req.subject as unknown as ProfileId,
      req.params.commentId
    );
    return new ApiSuccess(result);
  });
});
