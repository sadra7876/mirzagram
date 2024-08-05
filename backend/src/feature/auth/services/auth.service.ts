import { signJwt, verifyJwt } from "./jwt.service";

export class AuthService {
  async createAcessToken() {
    return signJwt();
  }

  async verifyAccessToken() {
    return verifyJwt();
  }

  // add other functions here
}
