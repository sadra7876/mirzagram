import { jwtPayload, signJwt } from "../utils/jwt.utils";

export abstract class JwtService {
  static createAccessToken(payload: jwtPayload): string {
    return signJwt(payload, {
      expiresIn: process.env.ACCESS_TOKEN_TTL!, //change this later
    });
  }

  //NOTE -  for second sprint
  static createRefreshToken(user: any, sessionId: string): string {
    return signJwt(
      { ...user, session: sessionId },
      {
        expiresIn: process.env.REFRESH_TOKEN_TTL!, //change this later
      }
    );
  }
}
