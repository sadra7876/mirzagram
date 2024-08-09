import { Router } from "express";
// import { signinDTO } from "../../auth/routes/dto/signin.dto";
import { profileService } from "../../../dependencies";
import { handleRequest } from "../../../utils/handle-request";
import { ProfileId } from "@CommonTypes/profile.type";
import { profileDTO } from "./dto/profile.dto";
import { parse } from "path";
import { parseJwt } from "middlewares/auth.middleware";
import { ApiSuccess } from "@utils/http-response";
import { string } from "zod";
import { strings } from "resources/strings";

export const profileRoutes = Router();
profileRoutes.use(parseJwt);

profileRoutes.get("/", (req, res) => {
  handleRequest(res, async () => {
    const profileId = res.locals.jwt.id;
    const result = await profileService.getUserProfile(profileId);
    return new ApiSuccess(result);
  });
});

profileRoutes.put("/", (req, res) => {
  handleRequest(res, async () => {
    const profileId = res.locals.jwt.id;
    await profileService.updateUserProfile(
      profileDTO.parse(req.body),
      profileId
    );
    return new ApiSuccess();
  });
});
