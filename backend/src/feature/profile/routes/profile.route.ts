import { Router } from "express";
import { signinDTO } from "./dto/signin.dto";
import { profileService } from "../../../dependencies";
import { handleRequest } from "../../../utils/handle-request";

export const profileRoutes = Router();

profileRoutes.post("/signin", (req, res) => {
  handleRequest(res, async () => {
    return await profileService.signin(signinDTO.parse(req.body));
  });
});
