import { Router, Response, Request } from "express";
import { handleHttpRequest } from "../../../utils/utils";
import { authService } from "../../../dependencies";
import { signinDTO } from "./dto/signin.dto";

export const authRoutes = Router();

authRoutes.post("/signin", (req, res) => {
    handleHttpRequest(res, async () => {
        authService.signin(signinDTO.parse(req.body));
    });
});