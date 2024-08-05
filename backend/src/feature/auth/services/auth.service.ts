// import { SigninDTO } from "../routes/dto/signin.dto";
// import { signupDTO } from "../routes/dto/signup.dto";
// import jwt from 'jsonwebtoken';
// import { IProfileRepository } from "../../profile/repository/profile.repo";

// export class AuthService {

//   constructor(private readonly authRepo: IProfileRepository) {}

//   async signin(signinDTO: SigninDTO): Promise<string> {
//     let user;
//     // if(signinDTO.username.match("^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$")) {
//     //   user = this.authRepo.getById(signinDTO.username);
//     // }
//     // user = await this.authRepo.getByUsername(signinDTO.username);

//     // if(!user) {
//     //   throw Error("User not found");
//     // }

//     // if(user.password !== signinDTO.password) {
//     //   throw Error("Username or password is wrong!");
//     // }

//     const jwtPayload = {
//       subjectId: 1,
//       username: "user.id",
//     }
//     return jwt.sign(jwtPayload, "SECRET");
//   }

//   async signup(siginupDTO: signupDTO) {
//     if (!validatePassword(siginupDTO.password, siginupDTO.passwordconfrim)) {
//       throw new Error("Passwords do not match");
//     }

//     if (await userAuthRepository.getByUsername(siginupDTO.username)) {
//       throw new Error("username already exist");
//     }

//     if (await userAuthRepository.getByEmail(siginupDTO.email)) {
//       throw new Error("email already exist");
//     }

//     await userAuthRepository.createOrUpdate(newUserAuth(siginupDTO));
//   }

//   async verifyAccessToken() {
//     return verifyJwt();
//   }

//   // add other functions here
// }
