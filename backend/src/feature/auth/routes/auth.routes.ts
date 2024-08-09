import { Router } from "express";
import { authService } from "../../../dependencies";
import {
  signupRequestDTO,
  signinRequestDTO,
  forgotPasswordDTO,
  resetPasswordDTO,
} from "../dto";
import { handleRequest } from "@utils/handle-request";
import { ApiSuccess } from "@utils/http-response";

export const authRoutes = Router();

authRoutes.post("/sign-up", (req, res) => {
  handleRequest(res, async () => {
    const result = await authService.signup(signupRequestDTO.parse(req.body));
    return new ApiSuccess(result, [ "User created successfully" ]);
  });
});

authRoutes.post("/sign-in", (req, res) => {
  handleRequest(res, async () => {
    const result = await authService.signin(signinRequestDTO.parse(req.body));
    return new ApiSuccess(result, [ "Signed in successfully" ]);
  });
});

authRoutes.post("/forgot-password", (req, res) => {
  handleRequest(res, async () => {
    const result = await authService.sendPasswordResetEmail(
      forgotPasswordDTO.parse(req.body)
    );
    return new ApiSuccess(result, [ "Reset password link sent successfully" ]);
  });
});

authRoutes.post("/reset-password", (req, res) => {
  handleRequest(res, async () => {
    const result = await authService.resetPassword(resetPasswordDTO.parse(req.body));
    return new ApiSuccess(result, [ "Password reset successfully" ]);
  });
});
