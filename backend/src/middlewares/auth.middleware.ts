import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../feature/auth/utils/jwt.utils";
import { ApiError } from "@utils/http-response";

export const parseJwt = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).send(new ApiError(401, "Unauthorized"));
  }

  const { valid, payload } = verifyAccessToken(accessToken);

  if (valid && payload && payload.sub) {
    req.subject = payload.sub
    next();
  } else {
    return res.status(401).send(new ApiError(401, "Unauthorized"));
  }
};
