import { jwtPayload, signJwt } from "../utils/jwt.utils";

export abstract class JwtService {
  static createAccessToken(payload: jwtPayload): string {
    return signJwt(payload, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_TTL!, //change this later
    });
  }
}
