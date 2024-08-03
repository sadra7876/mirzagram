import { Router, Response, Request } from "express";
import { handleHttpRequest } from "../../../utils/utils";
import { authService } from "../../../dependencies";
import { signinDTO } from "./dto/signin.dto";
import { signupDTO } from "./dto/signup.dto";

export const authRoutes = Router();

authRoutes.post("/signin", (req, res) => {
  handleHttpRequest(res, async () => {
    authService.signin(signinDTO.parse(req.body));
  });
});

authRoutes.post("/signup", (req, res) => {
  handleHttpRequest(res, async () => {
    authService.signup(signupDTO.parse(req.body));
  });
});
