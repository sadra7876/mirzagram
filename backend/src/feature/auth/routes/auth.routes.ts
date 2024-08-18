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
import { strings } from "resources/strings";

export const authRoutes = Router();

authRoutes.post("/sign-up", (req, res) => {
  handleRequest(res, async () => {
    const result = await authService.signup(signupRequestDTO.parse(req.body));
    return new ApiSuccess(result, [strings.CREATE_USER_SUCCESSFUL]);
  });
});

authRoutes.post("/sign-in", (req, res) => {
  handleRequest(res, async () => {
    const result = await authService.signin(signinRequestDTO.parse(req.body));
    return new ApiSuccess(result, [strings.SIGNIN_USER_SUCCESSFUL]);
  });
});

authRoutes.post("/forgot-password", (req, res) => {
  handleRequest(res, async () => {
    const result = await authService.sendPasswordResetEmail(
      forgotPasswordDTO.parse(req.body)
    );
    return new ApiSuccess(result, [
      strings.SEND_RESET_PASSWORD_LINK_SUCCESSFUL,
    ]);
  });
});

authRoutes.post("/reset-password", (req, res) => {
  handleRequest(res, async () => {
    const result = await authService.resetPassword(
      resetPasswordDTO.parse(req.body)
    );
    return new ApiSuccess(result, [strings.RESET_PASSWORD_SUCCESSFUL]);
  });
});
