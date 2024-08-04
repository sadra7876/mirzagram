import { userAuthRepository } from "../../../dependencies";
import { newUserAuth, validatePassword } from "../../../utils/utils";
import { SigninDTO } from "../routes/dto/signin.dto";
import { signupDTO } from "../routes/dto/signup.dto";

export class AuthService {
  signin(signinDTO: SigninDTO) {}

  async signup(siginupDTO: signupDTO) {
    if (!validatePassword(siginupDTO.password, siginupDTO.passwordconfrim)) {
      throw new Error("Passwords do not match");
    }

    if (await userAuthRepository.getByUsername(siginupDTO.username)) {
      throw new Error("username already exist");
    }

    if (await userAuthRepository.getByEmail(siginupDTO.email)) {
      throw new Error("email already exist");
    }

    await userAuthRepository.createOrUpdate(newUserAuth(siginupDTO));
  }
}
