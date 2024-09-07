import { ProfileId } from "@CommonTypes/profile.type";
import { IBookmarkRepository } from "@feature/bookmark/repository/bookmark.repo";
import { IFollowRepository } from "@feature/follow/repository/follow.repo";
import { IPostLikeRepository } from "@feature/post/repository/post-like.repo";
import { IPostRepository } from "@feature/post/repository/post.repo";
import { ExploreResponseDTO } from "../dto/explore.dto";
import { ClientError } from "@utils/http-error";
import { strings } from "resources/strings";
import { ICommentRepository } from "@feature/comment/repository/comment.repo";
import { convertFileNameToURL } from "@utils/utils";
import { ContentDTO } from "@feature/post/dto/content.dto";

interface Dependencies {
  followRepo: IFollowRepository;
  postRepo: IPostRepository;
  likeRepo: IPostLikeRepository;
  bookmarkRepo: IBookmarkRepository;
  commentRepo: ICommentRepository;
}

export class Explore {
  constructor(private readonly deps: Dependencies) {}

  async getPosts(id: ProfileId, page: number, pagelimit: number) {
    const following = await this.deps.followRepo.getAllFollowingByProfileId(id);
    let result: (ExploreResponseDTO | null)[] = [];
    if (following && following[0]) {
      const followingIds = following?.map((i) => {
        return i.following.id;
      });
      const contents = await this.deps.postRepo.getPostsByProfileIds(
        followingIds,
        page,
        pagelimit
      );
      if (!contents) {
        throw new ClientError(strings.POST_NOT_FOUND_ERROR);
      }
      result = await Promise.all(
        contents.map(async (i) => {
          const likeCount = await this.deps.likeRepo.getLikeCountForPost(i.id);
          const bookmarkCount =
            await this.deps.bookmarkRepo.getBookmarkCountByPostId(i.id);
          const commentCount =
            await this.deps.commentRepo.getCommentCountByPostId(i.id);
          const followerCount =
            await this.deps.followRepo.getFollowerCountByProfileId(i.owner.id);
          const response: ExploreResponseDTO = {
            id: i.id,
            likeCount,
            contents: i.contents
              .sort((i) => i.order)
              .map<ContentDTO>((i) => {
                return { url: convertFileNameToURL(i.fileName, "post") };
              }),
            bookmarkCount,
            commentCount,
            ownerProfilePicture: i.owner.profilePicture
              ? convertFileNameToURL(i.owner.profilePicture, "profile")
              : undefined,
            firstName: i.owner.firstName,
            lastName: i.owner.lastName,
            followerCount,
          };
          return response;
        })
      );
    }
    return result;
  }
}
