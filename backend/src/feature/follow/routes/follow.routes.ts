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

    const result = await followService.followUser(
      followerId,
      followRequestDTO.parse(req.body)
    );
    return new ApiSuccess(result.message);
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

followRoutes.post("/cancel", (req, res) => {
  handleRequest(res, async () => {
    const followerId: ProfileId = Number(req.subject) as ProfileId;

    await followService.cancelFollowRequest(
      followerId,
      followRequestDTO.parse(req.body)
    );

    return new ApiSuccess(strings.FOLLOW_REQUEST_CANCELED);
  });
});

followRoutes.post("/reject", (req, res) => {
  handleRequest(res, async () => {
    const followerId: ProfileId = Number(req.subject) as ProfileId;

    await followService.rejectFollowRequest(
      followerId,
      followRequestDTO.parse(req.body)
    );

    return new ApiSuccess(strings.FOLLOW_REQUEST_REJECTED);
  });
});

followRoutes.post("/accept", (req, res) => {
  handleRequest(res, async () => {
    const followerId: ProfileId = Number(req.subject) as ProfileId;

    await followService.acceptFollowRequest(
      followerId,
      followRequestDTO.parse(req.body)
    );

    return new ApiSuccess(strings.FOLLOW_REQUEST_ACCEPTED);
  });
});

followRoutes.get("/recived-requests", (req, res) => {
  handleRequest(res, async () => {
    const profileId: ProfileId = Number(req.subject) as ProfileId;
    const page = parseInt(req.query.page as string) || 1;
    const pagelimit = parseInt(req.query.pagelimit as string) || 10;

    const result = await followService.getRecivedRequests(
      profileId,
      page,
      pagelimit
    );
    return new ApiSuccess(result);
  });
});

followRoutes.get("/sent-requests", (req, res) => {
  handleRequest(res, async () => {
    const profileId: ProfileId = Number(req.subject) as ProfileId;
    const page = parseInt(req.query.page as string) || 1;
    const pagelimit = parseInt(req.query.pagelimit as string) || 10;

    const result = await followService.getSentRequest(
      profileId,
      page,
      pagelimit
    );
    return new ApiSuccess(result);
  });
});

followRoutes.get("/following", (req, res) => {
  const username = req.query.username as Username;
  const page = parseInt(req.query.page as string) || 1;
  const pagelimit = parseInt(req.query.pagelimit as string) || 10;

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

followRoutes.get("/follower", (req, res) => {
  const username = req.query.username as Username;
  const page = parseInt(req.query.page as string) || 1;
  const pagelimit = parseInt(req.query.pagelimit as string) || 10;

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
