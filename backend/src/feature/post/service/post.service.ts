import { ProfileId, Username } from "@CommonTypes/profile.type";
import { CreatePostRequestDTO } from "../dto/create-post-request.dto";
import { IPostRepository } from "../repository/post.repo";
import { ClientError } from "@utils/http-error";
import { strings } from "resources/strings";
import { IProfileRepository } from "@feature/profile/repository/profile.repo";
import { Profile } from "@feature/profile/repository/profile.entity";
import { Content } from "../repository/entities/content.entity";
import { Hashtag } from "../repository/entities/hashtag.entity";
import { Mention } from "../repository/entities/mention.entity";
import { Post } from "../repository/entities/post.entity";
import { ContentDTO } from "../dto/content.dto";
import { HashtagDTO } from "../dto/hashtag.dto";
import { MentionDTO } from "../dto/mentions.dto";
import { PostDTO } from "../dto/post.dto";
import { PostSummaryDTO } from "../dto/post-summary.dto";
import { convertFileNameToURL } from "@utils/utils";
import { EditPostRequestDTO } from "../dto/edit-post-request.dto";
import { IPostLikeRepository } from "../repository/post-like.repo";
import { PostLike } from "../repository/entities/post-like.entity";
import { PostLikeRequestDTO } from "../dto/post-like-request.dto";
import { INotificationRepository } from "@feature/notification/repository/notification.repo";
import { NotificationEventEmitter } from "@feature/notification/event-handler/notification-event";
import { IBookmarkRepository } from "@feature/bookmark/repository/bookmark.repo";

const HASHTAG_REGEX = /#[\u0600-\u06FF\sa-z0-9_]+/g;

interface Dependencies {
  postRepo: IPostRepository;
  profileRepo: IProfileRepository;
  postLikeRepo: IPostLikeRepository;
  postLikeNotificationRepo: INotificationRepository;
  notificationEventEmitter: NotificationEventEmitter;
  bookmarkRepo: IBookmarkRepository;
}

export class PostService {
  constructor(private readonly deps: Dependencies) {}

  async createPost(
    profileId: ProfileId,
    request: CreatePostRequestDTO
  ): Promise<string> {
    const profile = await this.deps.profileRepo.getById(profileId);

    if (!profile || !profile.isActive) {
      throw new ClientError(strings.CANNOT_ADD_POST_FOR_PROFILE_ERROR);
    }

    const post = await this.buildPostFromPostRequest(request, profile);

    const result = this.deps.postRepo.createOrUpdatePost(post);

    if (post.mentions) {
      this.deps.notificationEventEmitter.emit("MENTION_NOTIFICATION", {
        mentions: post.mentions,
        action: "mentioned",
        post,
      });
    }

    return result;
  }

  async getPost(profileId: ProfileId, id: string): Promise<PostDTO> {
    const post = await this.deps.postRepo.getPost(id);

    if (!post) {
      throw new ClientError(strings.POST_NOT_FOUND_ERROR);
    }

    // Commented to allow public access to posts!
    // if (post.owner.id !== profileId) {
    //   throw new ClientError(strings.POST_FORBIDDEN_ERROR, 403);
    // }

    const likeCount = await this.deps.postLikeRepo.getLikeCountForPost(post.id);
    const bookmarkCount = await this.deps.bookmarkRepo.getBookmarkCountByPostId(
      post.id
    );
    const bookmark = await this.deps.bookmarkRepo.getBookmark(
      profileId,
      post.id
    );
    const isBookmarked: boolean = bookmark ? true : false;
    const liked = await this.deps.postLikeRepo.getLike(profileId, post.id);
    const isLiked: boolean = liked ? true : false;

    return {
      id: post?.id,
      ownerProfileId: post.owner.id,
      owner: {
        username: post.owner.username,
        firstName: post.owner.firstName,
        lastName: post.owner.lastName,
        profilePicture: convertFileNameToURL(
          post.owner.profilePicture || "",
          "profile"
        ),
      },
      createdAt: post.createdAt,
      caption: post.caption,
      hashtags: post.hashtags?.map<HashtagDTO>((h) => {
        return {
          tag: h.tag,
        };
      }),
      mentions: post.mentions?.map<MentionDTO>((m) => {
        return {
          username: m.mentionedProfile.username,
        };
      }),
      contents: post.contents
        .sort((c) => c.order)
        .map<ContentDTO>((c) => {
          return {
            url: convertFileNameToURL(c.fileName, "post"),
          };
        }),
      likeCount,
      bookmarkCount,
      isBookmarked,
      isLiked,
    };
  }

  async editPost(
    profileId: ProfileId,
    id: string,
    modifiedPost: EditPostRequestDTO
  ): Promise<string> {
    const orgPost = await this.deps.postRepo.getPost(id);

    if (!orgPost) {
      throw new ClientError(strings.POST_NOT_FOUND_ERROR);
    }

    if (orgPost.owner.id !== profileId) {
      throw new ClientError(strings.POST_FORBIDDEN_ERROR, 403);
    }

    const newPost = await this.editPostFromPostRequest(orgPost, modifiedPost);
    return this.deps.postRepo.createOrUpdatePost(newPost);
  }

  async getPostsByProfileId(
    profileId: ProfileId
  ): Promise<PostSummaryDTO[] | undefined> {
    const posts = await this.deps.postRepo.getPostsByProfile(profileId);

    if (!posts) {
      return undefined;
    }

    return posts.map<PostSummaryDTO>((p) => {
      return {
        id: p.id,
        createdAt: p.createdAt,
        thumbnail: {
          url: convertFileNameToURL(
            p.contents.sort((c) => c.order)[0].fileName,
            "post"
          ),
        },
      };
    });
  }

  async getPostLikes(
    profileId: ProfileId,
    postId: string,
    page: number,
    pageSize: number
  ) {
    const likes = await this.deps.postLikeRepo.getPaginatedLikesForPost(
      postId,
      page,
      pageSize
    );

    const mappedLikes = likes.map((l) => {
      return {
        id: l.id,
        likedAt: l.likedAt,
        profile: {
          username: l.profile.username,
          displayName: `${l.profile.firstName} ${l.profile.lastName}`,
          profilePictureURL: l.profile.profilePicture
            ? convertFileNameToURL(l.profile.profilePicture || "", "profile")
            : null,
        },
      };
    });

    return {
      page,
      data: mappedLikes,
    };
  }

  async likePost(profileId: ProfileId, likeReq: PostLikeRequestDTO) {
    const bookmark = await this.deps.postLikeRepo.getLike(
      profileId,
      likeReq.postId
    );
    if (bookmark) {
      return;
    }

    const profile = await this.deps.profileRepo.getById(profileId);
    if (!profile) {
      throw new ClientError(strings.PROFILE_NOT_FOUND_ERROR);
    }

    const post = await this.deps.postRepo.getPost(likeReq.postId);
    if (!post) {
      throw new ClientError(strings.POST_NOT_FOUND_ERROR);
    }

    const like = new PostLike();
    like.post = post;
    like.profile = profile;
    await this.deps.postLikeRepo.addLikeToPost(like);

    // const notif = new LikeNotification();
    // notif.action = "like";
    // notif.likedPost = post;
    // notif.likedByProfile = profile;
    // await this.deps.postLikeNotificationRepo.insertLikeNotification(notif);
    this.deps.notificationEventEmitter.emit("POST_LIKE_NOTIFICATION", {
      action: "like",
      likedByProfile: profile,
      likedPost: post,
    });
  }

  async removeLike(profileId: ProfileId, likeReq: PostLikeRequestDTO) {
    const profile = await this.deps.profileRepo.getById(profileId);
    if (!profile) {
      throw new ClientError(strings.PROFILE_NOT_FOUND_ERROR);
    }

    const post = await this.deps.postRepo.getPost(likeReq.postId);
    if (!post) {
      throw new ClientError(strings.POST_NOT_FOUND_ERROR);
    }

    const result = await this.deps.postLikeRepo.removeLikeFromPost(
      profileId,
      likeReq.postId
    );

    if (result.affected) {
      this.deps.notificationEventEmitter.emit("POST_LIKE_NOTIFICATION", {
        action: "dislike",
        likedByProfile: profile,
        likedPost: post,
      });
    }
  }

  private async buildPostFromPostRequest(
    data: CreatePostRequestDTO,
    owner: Profile
  ): Promise<Post> {
    const newPost = new Post();

    newPost.owner = owner;

    if (data.caption) {
      newPost.caption = data.caption || undefined;
      newPost.hashtags = data.caption.match(HASHTAG_REGEX)?.map((h) => {
        const hastag = new Hashtag();
        hastag.tag = h.replace("#", "");
        return hastag;
      });
    }

    newPost.contents = data.fileNames.map((n, index) => {
      const c = new Content();
      c.fileName = n;
      c.owner = owner;
      c.order = index;
      return c;
    });

    if (data.mentions) {
      newPost.mentions = await Promise.all(
        data.mentions.map(async (m) => {
          const mentionedProfile = await this.deps.profileRepo.getByUsername(
            m as unknown as Username
          );

          if (!mentionedProfile) {
            throw new ClientError(strings.MENTION_USERNAME_NOT_EXIST_ERROR);
          }

          const men = new Mention();
          men.mentionedProfile = mentionedProfile;
          men.mentioningProfile = owner;
          return men;
        })
      );
    }

    return newPost;
  }

  private async editPostFromPostRequest(
    post: Post,
    modifiedPost: EditPostRequestDTO
  ): Promise<Post> {
    post.caption = modifiedPost.caption || post.caption;

    if (modifiedPost.fileNames && modifiedPost.fileNames?.length > 0) {
      post.contents = modifiedPost.fileNames.map((n, index) => {
        const c = new Content();
        c.fileName = n;
        c.owner = post.owner;
        c.order = index;
        return c;
      });
    }

    if (modifiedPost.mentions && modifiedPost.mentions.length > 0) {
      post.mentions = await Promise.all(
        modifiedPost.mentions.map(async (m) => {
          const mentionedProfile = await this.deps.profileRepo.getByUsername(
            m as unknown as Username
          );

          if (!mentionedProfile) {
            throw new ClientError(strings.MENTION_USERNAME_NOT_EXIST_ERROR);
          }

          const men = new Mention();
          men.mentionedProfile = mentionedProfile;
          men.mentioningProfile = post.owner;
          return men;
        })
      );
    }

    post.hashtags = modifiedPost.caption?.match(HASHTAG_REGEX)?.map((h) => {
      const hastag = new Hashtag();
      hastag.tag = h;
      return hastag;
    });

    return post;
  }
}
