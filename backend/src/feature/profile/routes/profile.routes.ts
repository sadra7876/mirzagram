import { Router } from "express";
import { profileService } from "../../../dependencies";
import { handleRequest } from "../../../utils/handle-request";
import { ProfileId } from "@CommonTypes/profile.type";
import {
  exploreRequestDTO,
  profileRequestDTO,
  ProfileResponseDTO,
} from "../dto/profile.dto";
import { authMiddleware } from "middlewares/auth.middleware";
import { ApiSuccess } from "@utils/http-response";
import { strings } from "resources/strings";

export const profileRoutes = Router();
profileRoutes.use(authMiddleware);

profileRoutes.get("/", (req, res) => {
  const username = req.query.username as Username;

  handleRequest(res, async () => {
    const profileId: ProfileId = Number(req.subject) as ProfileId;

<<<<<<< backend/src/feature/profile/routes/profile.routes.ts
    const result: ProfileResponseDTO =
      await profileService.getUserProfile(profileId);
=======
    const result: ProfileResponseDTO = await profileService.getUserProfile(
      profileId,
      username
    );
>>>>>>> backend/src/feature/profile/routes/profile.routes.ts
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
