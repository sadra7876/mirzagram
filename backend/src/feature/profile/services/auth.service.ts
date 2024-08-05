import { Profile } from "../repository/profile.entity";
import { signupDTO } from "../routes/dto/signup.dto";
import { IProfileRepository } from "../../profile/repository/profile.repo";
import { validatePassword, hashPassword } from "../profile.utils";

export class AuthService {
  constructor(private readonly authRepo: IProfileRepository) {}

  async signup(signupDTO: signupDTO) {
    if (!validatePassword(signupDTO.password, signupDTO.passwordconfrim)) {
      throw new Error("Passwords do not match");
    }

    if (await this.authRepo.getByUsername(signupDTO.username)) {
      throw new Error("username already exist");
    }

    if (await this.authRepo.getByEmail(signupDTO.email)) {
      throw new Error("email already exist");
    }

    const newUserAuth = new Profile();
    newUserAuth.username = signupDTO.username;
    newUserAuth.email = signupDTO.email;
    newUserAuth.password = await hashPassword(signupDTO.password);

    await this.authRepo.createOrUpdate(newUserAuth);
  }
}
