import { Router, Request, Response } from "express";
import { handleHttpRequest } from "../../../utils/utils";
import { authService } from "../../../dependencies";
import { signupDTO } from "./dto/signup.dto";

export const authRoutes = Router();

authRoutes.post("/signup", (req, res) => {
  handleHttpRequest(res, async () => {
    authService.signup(signupDTO.parse(req.body));
  });
});
