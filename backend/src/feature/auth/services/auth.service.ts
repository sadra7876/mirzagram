// import { userAuthRepository } from "../../../dependencies";
// import { validatePassword } from "../auth.utils";
// // import { UserAuth } from "../respositories/user-auth.entity";
// import { SigninDTO } from "../routes/dto/signin.dto";
// import { signupDTO } from "../routes/dto/signup.dto";

// export class AuthService {
//   signin(signinDTO: SigninDTO) {}

//   async signup(signupDTO: signupDTO) {
//     if (!validatePassword(signupDTO.password, signupDTO.passwordconfrim)) {
//       throw new Error("Passwords do not match");
//     }

//     if (await userAuthRepository.getByUsername(signupDTO.username)) {
//       throw new Error("username already exist");
//     }

//     if (await userAuthRepository.getByEmail(signupDTO.email)) {
//       throw new Error("email already exist");
//     }

//     const newUserAuth = new UserAuth();
//     newUserAuth.username = signupDTO.username;
//     newUserAuth.email = signupDTO.email;
//     newUserAuth.password = signupDTO.password;

//     await userAuthRepository.createOrUpdate(newUserAuth);
//   }

//   // add other functions here
// }
