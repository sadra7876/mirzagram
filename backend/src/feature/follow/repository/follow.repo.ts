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
  getFollowerByProfileId(
    id: ProfileId,
    page: number,
    pagelimit: number
  ): Promise<Follow[] | null>;
  getFollowingByProfileId(
    id: ProfileId,
    page: number,
    pagelimit: number
  ): Promise<Follow[] | null>;
  getFollowerCountByProfileId(id: ProfileId): Promise<number>;
  getFollowingCountByProfileId(id: ProfileId): Promise<number>;
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
    return this.repository.findOne({
      where: { follower: followerProfile, following: followingProfile },
    });
  }

  async getFollowerByProfileId(
    id: ProfileId,
    page: number,
    pagelimit: number
  ): Promise<Follow[] | null> {
    const quryBuilder = this.repository
      .createQueryBuilder("follow")
      .leftJoinAndSelect("follow.follower", "profile")
      .where("follow.followingId = :id", { id })
      .orderBy("follow.createdAt", "DESC");

    const follower = quryBuilder
      .skip((page - 1) * pagelimit)
      .take(pagelimit)
      .getMany();

    return follower;
  }

  async getFollowingByProfileId(
    id: ProfileId,
    page: number,
    pagelimit: number
  ): Promise<Follow[] | null> {
    const quryBuilder = this.repository
      .createQueryBuilder("follow")
      .leftJoinAndSelect("follow.following", "profile")
      .where("follow.followerId = :id", { id })
      .orderBy("follow.createdAt", "DESC");

    const following = quryBuilder
      .skip((page - 1) * pagelimit)
      .take(pagelimit)
      .getMany();

    return following;
  }

  async getFollowerCountByProfileId(id: ProfileId): Promise<number> {
    return this.repository
      .createQueryBuilder("follow")
      .where("follow.followingId = :id", { id })
      .getCount();
  }

  async getFollowingCountByProfileId(id: ProfileId): Promise<number> {
    return this.repository
      .createQueryBuilder("follow")
      .where("follow.followerId = :id", { id })
      .getCount();
  }
}
