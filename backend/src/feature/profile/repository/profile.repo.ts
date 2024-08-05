import { DataSource, Repository } from "typeorm";
import { Profile } from "./profile.entity";

export interface IProfileRepository {
  createOrUpdate(auth: Profile): Promise<Profile>;
  getById(id: number): Promise<Profile | null>;
  getByUsername(username: string): Promise<Profile | null>;
  getByEmail(email: string): Promise<Profile | null>;
}

export class ProfileRepository implements IProfileRepository {
  private readonly repo: Repository<Profile>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(Profile);
  }

  async getById(id: number): Promise<Profile | null> {
    return await this.repo.findOneBy({ id });
  }

  async createOrUpdate(profile: Profile) {
    return await this.repo.save(profile);
  }

  getByUsername(username: string): Promise<Profile | null> {
    throw new Error("Method not implemented.");
  }
  
  getByEmail(email: string): Promise<Profile | null> {
    throw new Error("Method not implemented.");
  }
}
