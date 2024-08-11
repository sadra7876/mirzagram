import { ProfileId } from "@CommonTypes/profile.type";
import jwt, { JwtPayload } from "jsonwebtoken";

export function generateAccessToken(subject: ProfileId): string {
  const payload: JwtPayload = {
    sub: subject.toString(),
  };
  const options = {
    expiresIn: process.env.JWT_ACCESS_TOKEN_TTL!,
  };
  return jwt.sign(payload, process.env.JWT_SECRET!, options);
}

export function verifyAccessToken(token: string): {
  valid: boolean;
  payload?: JwtPayload;
} {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    return {
      valid: true,
      payload: payload,
    };
  } catch (e: any) {
    return {
      valid: false,
    };
  }
}
