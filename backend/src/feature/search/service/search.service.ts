import { IFollowRepository } from "@feature/follow/repository/follow.repo";
import { IPostLikeRepository } from "@feature/post/repository/post-like.repo";
import { IPostRepository } from "@feature/post/repository/post.repo";
import { IProfileRepository } from "@feature/profile/repository/profile.repo";

interface Dependencies {
  profileRepo: IProfileRepository;
  postRepo: IPostRepository;
  followRepo: IFollowRepository;
  postLikeRepo: IPostLikeRepository;
}

export class SearchService {
  constructor(private readonly deps: Dependencies) {}
}
