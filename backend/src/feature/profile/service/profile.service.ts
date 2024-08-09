import { IProfileRepository } from "../repository/profile.repo";
import dotenv from "dotenv-flow";
dotenv.config();

interface dependencies {
  profileRepo: IProfileRepository;
}

export class ProfileService {
  constructor(private readonly deps: dependencies) {}
}
