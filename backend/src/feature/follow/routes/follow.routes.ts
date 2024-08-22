import { authMiddleware } from "middlewares/auth.middleware";
import { handleRequest } from "../../../utils/handle-request";
import { Router } from "express";
import { ProfileId, Username } from "@CommonTypes/profile.type";
import { followService } from "dependencies";
import { followRequestDTO } from "../dto/follow.dto";
import { strings } from "resources/strings";
import { ApiSuccess } from "@utils/http-response";

export const followRoutes = Router();
followRoutes.use(authMiddleware);

followRoutes.post("/follow", (req, res) => {
  handleRequest(res, async () => {
    const followerId: ProfileId = Number(req.subject) as ProfileId;

    await followService.followUser(
      followerId,
      followRequestDTO.parse(req.body)
    );

    return new ApiSuccess(strings.FOLLOWED_SUCCESSFULLY);
  });
});

followRoutes.post("/unfollow", (req, res) => {
  handleRequest(res, async () => {
    const followerId: ProfileId = Number(req.subject) as ProfileId;

    await followService.unFollowUser(
      followerId,
      followRequestDTO.parse(req.body)
    );

    return new ApiSuccess(strings.UNFOLLOWED_SUCCESSFULLY);
  });
});

followRoutes.get("/getfollowing", (req, res) => {
  const username = req.query.username as Username;
  const page = parseInt(req.query.page as string);
  const pagelimit = parseInt(req.query.pagelimit as string);

  handleRequest(res, async () => {
    const profileId: ProfileId = Number(req.subject) as ProfileId;

    const result = await followService.getFollowing(
      profileId,
      username,
      page,
      pagelimit
    );
    return new ApiSuccess(result);
  });
});

followRoutes.get("/getfollower", (req, res) => {
  const username = req.query.username as Username;
  const page = parseInt(req.query.page as string);
  const pagelimit = parseInt(req.query.pagelimit as string);

  handleRequest(res, async () => {
    const profileId: ProfileId = Number(req.subject) as ProfileId;

    const result = await followService.getFollower(
      profileId,
      username,
      page,
      pagelimit
    );
    return new ApiSuccess(result);
  });
});
