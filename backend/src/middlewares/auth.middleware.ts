import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../feature/auth/utils/jwt.utils";

export const parseJwt = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { valid, decoded } = verifyJwt(accessToken);
  if (decoded && valid) {
    res.locals.jwt = decoded;
    next();
  }
};
