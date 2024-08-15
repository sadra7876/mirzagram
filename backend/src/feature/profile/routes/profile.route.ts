import { Router } from "express";
import { profileService } from "../../../dependencies";
import { handleRequest } from "../../../utils/handle-request";
import { ProfileId } from "@CommonTypes/profile.type";
import {
  exploreRequestDTO,
  profileRequestDTO,
  ProfileResponseDTO,
} from "../dto/profile.dto";
import { parse } from "path";
import { parseJwt } from "middlewares/auth.middleware";
import { ApiSuccess } from "@utils/http-response";
import { string } from "zod";
import { strings } from "resources/strings";

export const profileRoutes = Router();
profileRoutes.use(parseJwt);

profileRoutes.get("/", (req, res) => {
  handleRequest(res, async () => {
    const profileId: ProfileId = Number(req.subject) as ProfileId;

    const result: ProfileResponseDTO = await profileService.getUserProfile(
      profileId
    );
    return new ApiSuccess(result);
  });
});

profileRoutes.put("/", (req, res) => {
  handleRequest(res, async () => {
    const profileId: ProfileId = Number(req.subject) as ProfileId;
    await profileService.updateUserProfile(
      profileRequestDTO.parse(req.body),
      profileId
    );
    return new ApiSuccess(strings.UPDAT_PROFILE_SUCCESSFUL);
  });
});

profileRoutes.get("/explore", (req, res) => {
  handleRequest(res, async () => {
    const result: ProfileResponseDTO = await profileService.getExploreProfile(
      exploreRequestDTO.parse(req.body)
    );
    return new ApiSuccess(result);
  });
});
