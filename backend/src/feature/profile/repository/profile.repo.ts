import { DataSource, Repository } from "typeorm";
import { Profile } from "./profile.entity";

export interface IProfileRepository {
  createOrUpdate(auth: Profile): Promise<Profile>;
  getById(id: string): Promise<Profile | null>;
}

export class ProfileRepository implements IProfileRepository {

  private readonly repo: Repository<Profile>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(Profile);
  }

  async getById(id: string): Promise<Profile | null> {
    return await this.repo.findOneBy({ id })
  }

  async createOrUpdate(profile: Profile) {
    return await this.repo.save(profile);
  }
}