import { ProfileId, Username } from "types/profile.type";
import { ClientError } from "utils/http-error";
import { strings } from "resources/strings";
import { IFollowRepository } from "@feature/follow/repository/follow.repo";
import { ICloseFriendRepository } from "../repository/close-friends.repo";
import { IBlockProfilesRepository } from "../repository/blocked-profiles.repo";
import { IProfileRepository } from "@feature/profile/repository/profile.repo";
import { CloseFriend } from "../repository/entities/close-friends.entity";
import { BlockedProfile } from "../repository/entities/blocked-profiles.entity";
import { ProfileManagerResponsDTO } from "../dto/profile-manager.dto";
import { convertFileNameToURL } from "@utils/utils";

interface Dependencies {
  closeFriendRepo: ICloseFriendRepository;
  BlockedFriendRepo: IBlockProfilesRepository;
  profileRepo: IProfileRepository;
  followRepo: IFollowRepository;
}

export class ProfileManagerService {
  constructor(private readonly deps: Dependencies) {}

  async getCloseFriends(profileId: ProfileId, page: number, pagelimit: number) {
    const user = await this.deps.profileRepo.getById(profileId);
    if (!user) {
      throw new ClientError(strings.USER_NOT_FOUND);
    }
    const friends = await this.deps.closeFriendRepo.getcloseFriends(
      user.id,
      page,
      pagelimit
    );
    if (friends.length === 0) {
      throw new ClientError(strings.NO_CLOSE_FRIENDS);
    }
    const res = await Promise.all(
      friends.map((i) => this.deps.profileRepo.getById(i.friend.id))
    );
    const results = res.map((i) => {
      if (!i) return null;
      const result: ProfileManagerResponsDTO = {
        username: i.username,
        email: i.email,
        firstName: i.firstName,
        lastName: i.lastName,
        isActive: i.isActive,
        isPrivate: i.isPrivate,
        bio: i.bio,
        profilePicture: convertFileNameToURL(i.profilePicture || "", "profile"),
        createdAt: i.createdAt,
      };
      return result;
    });
    return results;
  }

  async isCloseFriend(profileId: ProfileId, toBeFriendId: Username) {
    const user = await this.deps.profileRepo.getById(profileId);
    const toBeFriend = await this.deps.profileRepo.getByUsername(toBeFriendId);
    if (!user || !toBeFriend) {
      throw new ClientError(strings.USER_NOT_FOUND);
    }
    return this.deps.closeFriendRepo.isCloseFriend(user.id, toBeFriend.id);
  }

  async addCloseFriend(profileId: ProfileId, toBeFriendId: Username) {
    const user = await this.deps.profileRepo.getById(profileId);
    const toBeFriend = await this.deps.profileRepo.getByUsername(toBeFriendId);
    if (!user || !toBeFriend) {
      throw new ClientError(strings.USER_NOT_FOUND);
    }
    if (await this.deps.closeFriendRepo.isCloseFriend(user.id, toBeFriend.id)) {
      throw new ClientError(strings.USER_IS_ALREADY_CLOSE_FRIEND);
    }
    if (await this.deps.BlockedFriendRepo.isBlocked(user.id, toBeFriend.id)) {
      throw new ClientError(strings.USER_IS_BLOCKED);
    }
    if (!(await this.deps.followRepo.getFollowByTwoProfile(user, toBeFriend))) {
      throw new ClientError(strings.USER_IS_NOT_FOLLOWED);
    }
    const closeFriend = new CloseFriend();
    closeFriend.profile = user;
    closeFriend.friend = toBeFriend;
    await this.deps.closeFriendRepo.addCloseFriend(closeFriend);
  }

  async removeCloseFriend(profileId: ProfileId, toBeFriendId: Username) {
    const user = await this.deps.profileRepo.getById(profileId);
    const toBeFriend = await this.deps.profileRepo.getByUsername(toBeFriendId);
    if (!user || !toBeFriend) {
      throw new ClientError(strings.USER_NOT_FOUND);
    }
    await this.deps.closeFriendRepo.removeCloseFriend(user, toBeFriend);
  }

  async getBlockedProfiles(id: ProfileId, page: number, pagelimit: number) {
    const user = await this.deps.profileRepo.getById(id);
    if (!user) {
      throw new ClientError(strings.USER_NOT_FOUND);
    }
    const blockeds = await this.deps.BlockedFriendRepo.getBlockProfile(
      user.id,
      page,
      pagelimit
    );
    if (blockeds.length === 0) {
      throw new ClientError(strings.NO_CLOSE_FRIENDS);
    }
    const res = await Promise.all(
      blockeds.map((i) => this.deps.profileRepo.getById(i.blocked.id))
    );
    const results = res.map((i) => {
      if (!i) return null;
      const result: ProfileManagerResponsDTO = {
        username: i.username,
        email: i.email,
        firstName: i.firstName,
        lastName: i.lastName,
        isActive: i.isActive,
        isPrivate: i.isPrivate,
        bio: i.bio,
        profilePicture: convertFileNameToURL(i.profilePicture || "", "profile"),
        createdAt: i.createdAt,
      };
      return result;
    });
    return results;
  }

  async isBlocked(profileId: ProfileId, toBeBlockedId: Username) {
    const user = await this.deps.profileRepo.getById(profileId);
    const toBeBlocked =
      await this.deps.profileRepo.getByUsername(toBeBlockedId);
    if (!user || !toBeBlocked) {
      throw new ClientError(strings.USER_NOT_FOUND);
    }
    return this.deps.BlockedFriendRepo.isBlocked(user.id, toBeBlocked.id);
  }

  async addBlockProfile(profileId: ProfileId, toBeBlockedId: Username) {
    const user = await this.deps.profileRepo.getById(profileId);
    const toBeBlocked =
      await this.deps.profileRepo.getByUsername(toBeBlockedId);
    if (!user || !toBeBlocked) {
      throw new ClientError(strings.USER_NOT_FOUND);
    }
    if (await this.deps.BlockedFriendRepo.isBlocked(user.id, toBeBlocked.id)) {
      throw new ClientError(strings.USER_IS_BLOCKED);
    }

    const newBlockProfile = new BlockedProfile();
    newBlockProfile.profile = user;
    newBlockProfile.blocked = toBeBlocked;
    await this.deps.BlockedFriendRepo.addBlockProfile(newBlockProfile);
  }

  async unBlockProfile(profileId: ProfileId, toBeBlockedId: Username) {
    const user = await this.deps.profileRepo.getById(profileId);
    const toBeBlocked =
      await this.deps.profileRepo.getByUsername(toBeBlockedId);
    if (!user || !toBeBlocked) {
      throw new ClientError(strings.USER_NOT_FOUND);
    }
    await this.deps.BlockedFriendRepo.unBlockProfile(user, toBeBlocked);
  }
}
