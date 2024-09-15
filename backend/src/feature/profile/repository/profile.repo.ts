import { DataSource, Repository } from "typeorm";
import { Profile } from "./profile.entity";
import { Email, Username, ProfileId } from "../../../types/profile.type";
import { Follow } from "@feature/follow/repository/follow.entity";

export interface IProfileRepository {
  createOrUpdate(auth: Profile): Promise<Profile>;
  getById(id: ProfileId): Promise<Profile | null>;
  getByUsername(username: Username): Promise<Profile | null>;
  getByEmail(email: Email): Promise<Profile | null>;
  search(query: string, page: number, pageSize: number): Promise<Profile[]>;
}

export class ProfileRepository implements IProfileRepository {
  private readonly repo: Repository<Profile>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(Profile);
  }

  async search(
    query: string,
    page: number,
    pageSize: number
  ): Promise<Profile[]> {
    return this.repo
      .createQueryBuilder("profile")
      .leftJoinAndSelect("profile.followers", "follower")
      .where("profile.username ILIKE :query", { query: `%${query}%` })
      .orWhere("profile.firstName ILIKE :query", { query: `%${query}%` })
      .orWhere("profile.lastName ILIKE :query", { query: `%${query}%` })
      .addSelect((subQuery) => {
        return subQuery
          .select("COUNT(follow.id)", "count")
          .from(Follow, "follow")
          .where("follow.following.id = profile.id");
      }, "fcount")
      .orderBy("fcount", "DESC")
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany();
  }

  async getById(id: ProfileId): Promise<Profile | null> {
    return this.repo.findOneBy({ id });
  }

  async createOrUpdate(profile: Profile) {
    return this.repo.save(profile);
  }

  async getByUsername(username: Username): Promise<Profile | null> {
    return this.repo.findOneBy({ username });
  }

  async getByEmail(email: Email): Promise<Profile | null> {
    return this.repo.findOneBy({ email });
  }
}
