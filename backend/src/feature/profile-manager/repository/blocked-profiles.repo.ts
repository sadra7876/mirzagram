import { DataSource, Repository } from "typeorm";
import { Profile } from "@feature/profile/repository/profile.entity";

import { ProfileId } from "@CommonTypes/profile.type";
import { BlockedProfile } from "./entities/blocked-profiles.entity";

export interface IBlockProfilesRepository {
  addBlockProfile(newBlock: BlockedProfile): Promise<void>;
  unBlockProfile(profile: Profile, block: Profile): Promise<void>;
  getBlockProfile(
    profileId: ProfileId,
    page: number,
    pagelimit: number
  ): Promise<BlockedProfile[]>;
  isBlocked(profileId: ProfileId, blockId: ProfileId): Promise<boolean>;
}

export class BlockProfilesRepository implements IBlockProfilesRepository {
  private readonly repo: Repository<BlockedProfile>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(BlockedProfile);
  }

  async addBlockProfile(newBlock: BlockedProfile): Promise<void> {
    await this.repo.save(newBlock);
  }

  async unBlockProfile(profile: Profile, block: Profile): Promise<void> {
    await this.repo.delete({
      profile,
      blocked: block,
    });
  }

  async getBlockProfile(
    profileId: ProfileId,
    page: number,
    pagelimit: number
  ): Promise<BlockedProfile[]> {
    const queybuilder = this.repo
      .createQueryBuilder("blockProfile")
      .leftJoinAndSelect("blockProfile.blocked", "blocked")
      .leftJoinAndSelect("blockProfile.profile", "profile")
      .where("blockProfile.profile = :profileId", { profileId })
      .orderBy("blockProfile.createdAt", "DESC");

    return queybuilder
      .skip((page - 1) * pagelimit)
      .take(pagelimit)
      .getMany();
  }

  async isBlocked(profileId: ProfileId, blockId: ProfileId): Promise<boolean> {
    const result = await this.repo
      .createQueryBuilder("blockProfile")
      .leftJoinAndSelect("blockProfile.blocked", "blocked")
      .leftJoinAndSelect("blockProfile.profile", "profile")
      .where("blockProfile.profile = :profileId", { profileId })
      .andWhere("blockProfile.blocked = :blockId", { blockId })
      .getOne();
    return !!result;
  }
}
