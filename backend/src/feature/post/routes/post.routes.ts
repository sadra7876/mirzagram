import { ProfileId } from "@CommonTypes/profile.type";
import { handleRequest } from "@utils/handle-request";
import { ApiSuccess } from "@utils/http-response";
import { postService } from "dependencies";
import { Router } from "express";
import { authMiddleware } from "middlewares/auth.middleware";
import { createPostRequestDTO } from "../dto/create-post-request.dto";
import { strings } from "resources/strings";
import { editPostRequestDTO } from "../dto/edit-post-request.dto";
import { postLikeRequestDTO } from "../dto/post-like-request.dto";

export const postRoutes = Router();
postRoutes.use(authMiddleware);

postRoutes.get("/", (req, res) => {
  handleRequest(res, async () => {
    const result = await postService.getPostsByProfileId(
      req.subject as unknown as ProfileId
    );
    return new ApiSuccess(result);
  });
});

postRoutes.post("/", (req, res) => {
  handleRequest(res, async () => {
    const result = await postService.createPost(
      req.subject as unknown as ProfileId,
      createPostRequestDTO.parse(req.body)
    );
    return new ApiSuccess(result, [strings.POST_ADDED_SUCCESSFULLY]);
  });
});

postRoutes.get("/like", (req, res) => {
  handleRequest(res, async () => {
    const result = await postService.getPostLikes(
      req.subject as unknown as ProfileId,
      req.query.postId as string,
      parseInt(req.query.page as string) || 1,
      parseInt(req.query.pageSize as string) || 10
    );
    return new ApiSuccess(result);
  });
});

postRoutes.post("/like", (req, res) => {
  handleRequest(res, async () => {
    const result = await postService.likePost(
      req.subject as unknown as ProfileId,
      postLikeRequestDTO.parse(req.body)
    );
    return new ApiSuccess(result, [strings.LIKE_ADDED_SUCCESSFULLY]);
  });
});

postRoutes.delete("/like", (req, res) => {
  handleRequest(res, async () => {
    const result = await postService.removeLike(
      req.subject as unknown as ProfileId,
      postLikeRequestDTO.parse(req.body)
    );
    return new ApiSuccess(result, [strings.LIKE_REMOVED_SUCCESSFULLY]);
  });
});

postRoutes.get("/:id", (req, res) => {
  handleRequest(res, async () => {
    const result = await postService.getPost(
      req.subject as unknown as ProfileId,
      req.params.id
    );
    return new ApiSuccess(result);
  });
});

postRoutes.post("/:id", (req, res) => {
  handleRequest(res, async () => {
    const result = await postService.editPost(
      req.subject as unknown as ProfileId,
      req.params.id,
      editPostRequestDTO.parse(req.body)
    );
    return new ApiSuccess(result, [strings.POST_EDITED_SUCCESSFULLY]);
  });
});
