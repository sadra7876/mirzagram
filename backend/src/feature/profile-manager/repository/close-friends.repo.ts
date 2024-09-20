import { DataSource, Repository } from "typeorm";
import { Profile } from "@feature/profile/repository/profile.entity";
import { CloseFriend } from "./entities/close-friends.entity";
import { ProfileId } from "@CommonTypes/profile.type";

export interface ICloseFriendRepository {
  addCloseFriend(newCloseFriend: CloseFriend): Promise<void>;
  removeCloseFriend(profile: Profile, toBeFriend: Profile): Promise<void>;
  getcloseFriends(
    profileId: ProfileId,
    page: number,
    pagelimit: number
  ): Promise<CloseFriend[]>;

  isCloseFriend(profileId: ProfileId, friendId: ProfileId): Promise<boolean>;

  //   addBlockProfile(profile: Profile, block: Profile): Promise<void>;
  //   removeBlockProfile(profile: Profile, block: Profile): Promise<void>;
  //   getblodkedProfiles(profile: Profile): Promise<Profile[]>;
}

export class CloseFriendRepository implements ICloseFriendRepository {
  private readonly repo: Repository<CloseFriend>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(CloseFriend);
  }

  async addCloseFriend(newCloseFriend: CloseFriend): Promise<void> {
    // profile.closeFriends.push(closeFriend);
    await this.repo.save(newCloseFriend);
  }

  async removeCloseFriend(profile: Profile, friend: Profile): Promise<void> {
    await this.repo.delete({
      profile,
      friend,
    });
  }

  async getcloseFriends(
    profileId: ProfileId,
    page: number,
    pagelimit: number
  ): Promise<CloseFriend[]> {
    const queybuilder = this.repo
      .createQueryBuilder("closeFriend")
      .leftJoinAndSelect("closeFriend.friend", "friend")
      // .leftJoinAndSelect("closeFriend.profile", "profile")
      .where("closeFriend.profile = :profileId", { profileId })
      .orderBy("closeFriend.createdAt", "DESC");

    return queybuilder
      .skip((page - 1) * pagelimit)
      .take(pagelimit)
      .getMany();
  }
  async isCloseFriend(
    profileId: ProfileId,
    friendId: ProfileId
  ): Promise<boolean> {
    const result = await this.repo
      .createQueryBuilder("closeFriend")
      .leftJoinAndSelect("closeFriend.friend", "friend")
      .leftJoinAndSelect("closeFriend.profile", "profile")
      .where("closeFriend.profile = :profileId", { profileId })
      .andWhere("closeFriend.friend = :friendId", { friendId })
      .getOne();
    return !!result;
  }
}
