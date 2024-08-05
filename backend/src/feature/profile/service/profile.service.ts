import { IProfileRepository } from "../repository/profile.repo";

export class ProfileService {
  constructor(private readonly profileRepo: IProfileRepository) {}
  
}
