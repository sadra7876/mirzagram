import { Router } from "express";
import { profileManagerService } from "../../../dependencies";
import { handleRequest } from "../../../utils/handle-request";
import { ProfileId } from "@CommonTypes/profile.type";
import { profileManagerRequestDTO } from "../dto/profile-manager.dto";
import { authMiddleware } from "middlewares/auth.middleware";
import { ApiSuccess } from "@utils/http-response";
import { strings } from "resources/strings";

export const profileManagerRoutes = Router();
profileManagerRoutes.use(authMiddleware);

profileManagerRoutes.get("/close-friends", (req, res) => {
  handleRequest(res, async () => {
    const profileId: ProfileId = Number(req.subject) as ProfileId;
    const page = parseInt(req.query.page as string) || 1;
    const pagelimit = parseInt(req.query.pagelimit as string) || 10;
    const result = await profileManagerService.getCloseFriends(
      profileId,
      page,
      pagelimit
    );
    return new ApiSuccess(result);
  });
});

profileManagerRoutes.get("/is-close-friend", (req, res) => {
  handleRequest(res, async () => {
    const profileId: ProfileId = Number(req.subject) as ProfileId;
    const dto = profileManagerRequestDTO.parse(req.query);
    const result = await profileManagerService.isCloseFriend(
      profileId,
      dto.username
    );
    return new ApiSuccess(result);
  });
});

profileManagerRoutes.post("/add-close-friend", (req, res) => {
  handleRequest(res, async () => {
    const profileId: ProfileId = Number(req.subject) as ProfileId;
    const dto = profileManagerRequestDTO.parse(req.body);
    await profileManagerService.addCloseFriend(profileId, dto.username);
    return new ApiSuccess(strings.CLOSE_FRIEND_ADDED);
  });
});

profileManagerRoutes.post("/remove-close-friend", (req, res) => {
  handleRequest(res, async () => {
    const profileId: ProfileId = Number(req.subject) as ProfileId;
    const dto = profileManagerRequestDTO.parse(req.body);
    await profileManagerService.removeCloseFriend(profileId, dto.username);
    return new ApiSuccess(strings.CLOSE_FRIEND_REMOVED);
  });
});
// ---- block profile routes
profileManagerRoutes.get("/blocked-profiles", (req, res) => {
  handleRequest(res, async () => {
    const profileId: ProfileId = Number(req.subject) as ProfileId;
    const page = parseInt(req.query.page as string) || 1;
    const pagelimit = parseInt(req.query.pagelimit as string) || 10;
    const result = await profileManagerService.getBlockedProfiles(
      profileId,
      page,
      pagelimit
    );
    return new ApiSuccess(result);
  });
});

profileManagerRoutes.get("/is-profile-blocked", (req, res) => {
  handleRequest(res, async () => {
    const profileId: ProfileId = Number(req.subject) as ProfileId;
    const dto = profileManagerRequestDTO.parse(req.query);
    const result = await profileManagerService.isBlocked(
      profileId,
      dto.username
    );
    return new ApiSuccess(result);
  });
});

profileManagerRoutes.post("/block-profile", (req, res) => {
  handleRequest(res, async () => {
    const profileId: ProfileId = Number(req.subject) as ProfileId;
    const dto = profileManagerRequestDTO.parse(req.body);
    await profileManagerService.addBlockProfile(profileId, dto.username);
    return new ApiSuccess(strings.PROFILE_BLOCKED);
  });
});

profileManagerRoutes.post("/unblock-profile", (req, res) => {
  handleRequest(res, async () => {
    const profileId: ProfileId = Number(req.subject) as ProfileId;
    const dto = profileManagerRequestDTO.parse(req.body);
    await profileManagerService.unBlockProfile(profileId, dto.username);
    return new ApiSuccess(strings.PROFILE_UNBLOCKED);
  });
});
