import { ProfileId } from "@CommonTypes/profile.type";
import { appConfig } from "config";
import jwt, { JwtPayload } from "jsonwebtoken";

export function generateAccessToken(subject: ProfileId): string {
  const payload: JwtPayload = {
    sub: subject.toString(),
  };
  const options = {
    expiresIn: appConfig.JWT_ACCESS_TOKEN_EXPIRATION,
  };
  return jwt.sign(payload, appConfig.JWT_SECRET!, options);
}

export function verifyAccessToken(token: string): {
  valid: boolean;
  payload?: JwtPayload;
} {
  try {
    const payload = jwt.verify(token, appConfig.JWT_SECRET!) as JwtPayload;
    return {
      valid: true,
      payload,
    };
  } catch (e) {
    console.log(e); // FIXME - add logging
    return {
      valid: false,
    };
  }
}
