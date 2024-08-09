import { DataSource, Repository } from "typeorm";
import { Profile } from "./profile.entity";
import { Email, Username, ProfileId } from "../../../types/profile.type";

export interface IProfileRepository {
  createOrUpdate(auth: Profile): Promise<Profile>;
  getById(id: ProfileId): Promise<Profile | null>;
  getByUsername(username: Username): Promise<Profile | null>;
  getByEmail(email: Email): Promise<Profile | null>;
}

export class ProfileRepository implements IProfileRepository {
  private readonly repo: Repository<Profile>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(Profile);
  }

  async getById(id: ProfileId): Promise<Profile | null> {
    return await this.repo.findOneBy({ id });
  }

  async createOrUpdate(profile: Profile) {
    return await this.repo.save(profile);
  }

  async getByUsername(username: Username): Promise<Profile | null> {
    return await this.repo.findOneBy({ username });
  }

  async getByEmail(email: Email): Promise<Profile | null> {
    return await this.repo.findOneBy({ email });
  }
}
