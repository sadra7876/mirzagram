import { Profile } from "../../profile/repository/profile.entity";
import { signupDTO } from "../routes/dto/signup.dto";
import { IProfileRepository } from "../../profile/repository/profile.repo";
import { validatePassword, hashPassword } from "../auth.utils";
import { HttpError } from "../../../utils/http-error";
export class AuthService {
  constructor(private readonly authRepo: IProfileRepository) {}

  async signup(signupDTO: signupDTO): Promise<void> {
    if (!validatePassword(signupDTO.password, signupDTO.confirmPassword)) {
      throw new HttpError(400, "Passwords do not match");
    }

    if (await this.authRepo.getByUsername(signupDTO.username)) {
      throw new HttpError(400, "username already exist");
    }

    if (await this.authRepo.getByEmail(signupDTO.email)) {
      throw new HttpError(400, "email already exist");
    }

    const newUserAuth = new Profile();
    newUserAuth.username = signupDTO.username;
    newUserAuth.email = signupDTO.email;
    newUserAuth.password = await hashPassword(signupDTO.password);

    await this.authRepo.createOrUpdate(newUserAuth);
    return;
  }
}
