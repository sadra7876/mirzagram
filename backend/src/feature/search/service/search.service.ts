import { ProfileId } from "@CommonTypes/profile.type";
import { IFollowRepository } from "@feature/follow/repository/follow.repo";
import { IPostLikeRepository } from "@feature/post/repository/post-like.repo";
import { IPostRepository } from "@feature/post/repository/post.repo";
import { IProfileRepository } from "@feature/profile/repository/profile.repo";
import { convertFileNameToURL } from "@utils/utils";

interface Dependencies {
  profileRepo: IProfileRepository;
  postRepo: IPostRepository;
  followRepo: IFollowRepository;
  postLikeRepo: IPostLikeRepository;
}

export class SearchService {
  constructor(private readonly deps: Dependencies) {}

  async searchProfiles(
    profileId: ProfileId,
    query: string,
    page: number = 1,
    pageSize: number = 10
  ) {
    const matches = await this.deps.profileRepo.search(query, page, pageSize);
    return Promise.all(
      matches.map(async (p) => {
        return {
          id: p.id,
          username: p.username,
          firstName: p.firstName,
          lastName: p.lastName,
          profilePicture: p.profilePicture
            ? convertFileNameToURL(p.profilePicture, "profile")
            : undefined,
          followerCount: await this.deps.followRepo.getFollowerCountByProfileId(
            p.id
          ),
        };
      })
    );
  }
}
