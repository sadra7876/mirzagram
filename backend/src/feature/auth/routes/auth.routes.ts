import { Router, Request, Response } from "express";
import { authService } from "../../../dependencies";
import { signupDTO } from "./dto/signup.dto";
import { handleRequest } from "../../../utils/handle-request";

export const authRoutes = Router();

authRoutes.post("/signup", (req, res) => {
  handleRequest(res, async () => {
    authService.signup(signupDTO.parse(req.body));
  });
});
