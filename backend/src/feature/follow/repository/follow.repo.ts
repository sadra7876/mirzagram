import { DataSource, Repository } from "typeorm";
import { Follow } from "./follow.entity";
import { ProfileId } from "@CommonTypes/profile.type";
import { Profile } from "@feature/profile/repository/profile.entity";

export interface IFollowRepository {
  followProfile(follow: Follow): Promise<string>;
  unFollowProfile(follow: Follow): Promise<string>;
  getFollowByTwoProfile(
    followerProfile: Profile,
    followingProfile: Profile
  ): Promise<Follow | null>;
  getFollowerByPorofileId(id: ProfileId): Promise<Follow[] | null>;
  getFollowingByPorofileId(id: ProfileId): Promise<Follow[] | null>;
  getFollowerCountByPorofileId(id: ProfileId): Promise<number>;
  getFollowingCountByPorofileId(id: ProfileId): Promise<number>;
}

export class FollowRepository implements IFollowRepository {
  private readonly repository: Repository<Follow>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Follow);
  }

  async followProfile(follow: Follow): Promise<string> {
    const result = await this.repository.save(follow);
    return result.id;
  }

  async unFollowProfile(follow: Follow): Promise<string> {
    const result = await this.repository.remove(follow);
    return result.id;
  }

  async getFollowByTwoProfile(
    followerProfile: Profile,
    followingProfile: Profile
  ): Promise<Follow | null> {
    return await this.repository.findOne({
      where: { follower: followerProfile, following: followingProfile },
    });
  }

  async getFollowerByPorofileId(id: ProfileId): Promise<Follow[] | null> {
    return this.repository
      .createQueryBuilder("follow")
      .where("follow.followingId = :id", { id: id })
      .getMany();
  }

  async getFollowingByPorofileId(id: ProfileId): Promise<Follow[] | null> {
    return this.repository
      .createQueryBuilder("follow")
      .where("follow.followerId = :id", { id: id })
      .getMany();
  }

  async getFollowerCountByPorofileId(id: ProfileId): Promise<number> {
    return this.repository
      .createQueryBuilder("follow")
      .where("follow.followingId = :id", { id: id })
      .getCount();
  }

  async getFollowingCountByPorofileId(id: ProfileId): Promise<number> {
    return this.repository
      .createQueryBuilder("follow")
      .where("follow.followerId = :id", { id: id })
      .getCount();
  }
}
