import { Router, Response, Request } from "express";
import { handleRequest } from "../../../utils/handle-request";
import { signinDTO } from "./dto/signin.dto";
import { signupDTO } from "./dto/signup.dto";

export const authRoutes = Router();

authRoutes.post("/sign-in", (req, res) => {
  handleRequest(res, async () => {});
});

authRoutes.post("/sign-up", (req, res) => {
  handleRequest(res, async () => {});
});
