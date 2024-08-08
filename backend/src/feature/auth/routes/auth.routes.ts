import { Router, Request, Response } from "express";
import { authService } from "../../../dependencies";
import {
  signupDTO,
  signinDTO,
  forgotPasswordDTO,
  resetPasswordDTO,
} from "../dto";
import { handleRequest } from "@utils/handle-request";

export const authRoutes = Router();

authRoutes.post("/sign-up", (req, res) => {
  handleRequest(res, async () => {
    return await authService.signup(signupDTO.parse(req.body));
  });
});

authRoutes.post("/sign-in", (req, res) => {
  handleRequest(res, async () => {
    return await authService.signin(signinDTO.parse(req.body));
  });
});

authRoutes.post("/forgot-password", (req, res) => {
  handleRequest(res, async () => {
    return await authService.sendPasswordResetEmail(
      forgotPasswordDTO.parse(req.body)
    );
  });
});

authRoutes.post("/reset-password", (req, res) => {
  handleRequest(res, async () => {
    return await authService.resetPassword(resetPasswordDTO.parse(req.body));
  });
});
