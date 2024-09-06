import { ProfileId } from "@CommonTypes/profile.type";
import { ICommentRepository } from "../repository/comment.repo";
import { CreateCommentRequestDTO } from "../dto/new-comment.dto";
import { IPostRepository } from "@feature/post/repository/post.repo";
import { ClientError } from "@utils/http-error";
import { strings } from "resources/strings";
import { IProfileRepository } from "@feature/profile/repository/profile.repo";
import { ICommentLikeRepository } from "../repository/comment-like.repo";
import { Comment, CommentLike } from "../repository/entity/comment.entity";
import { CommentDTO } from "../dto/comment.dto";

interface Dependencies {
  commentRepo: ICommentRepository;
  postRepo: IPostRepository;
  profileRepo: IProfileRepository;
  commentLikeRepo: ICommentLikeRepository;
}

export class CommentService {
  constructor(private readonly deps: Dependencies) {}

  async getComment(profileId: ProfileId, id: string) {
    return this.deps.commentRepo.getComment(id);
  }

  async createComment(
    profileId: ProfileId,
    commentReq: CreateCommentRequestDTO
  ) {
    const post = await this.deps.postRepo.getPost(commentReq.postId);
    if (!post) {
      throw new ClientError(strings.POST_NOT_FOUND_ERROR);
    }

    const profile = await this.deps.profileRepo.getById(profileId);
    if (!profile) {
      throw new ClientError(strings.PROFILE_NOT_FOUND_ERROR);
    }

    const comment = new Comment();
    comment.text = commentReq.text;
    comment.post = post;
    comment.author = profile;

    if (commentReq.parentCommentId) {
      const repliedToComment = await this.deps.commentRepo.getComment(
        commentReq.parentCommentId
      );
      if (!repliedToComment) {
        throw new ClientError(strings.COMMENT_NOT_AVAILABLE_ERROR);
      }
      comment.repliedTo = repliedToComment;
    }

    await this.deps.commentRepo.createComment(comment);
    return;
  }

  async getCommentsForPost(
    profileId: ProfileId,
    postId: string,
    page: number,
    pageSize: number
  ) {
    const comments =
      await this.deps.commentRepo.getPaginatedTopLevelCommentsForPost(
        postId,
        page,
        pageSize
      );

    for (const comment of comments) {
      const replies = await this.deps.commentRepo.getPaginatedReplies(
        comment.id,
        1,
        10
      );
      comment.replies = replies;
    }

    return {
      page,
      data: this.flattenCommentsToTwoLevels(comments),
    };
  }

  private mapToComment(c: Comment): CommentDTO {
    return {
      id: c.id,
      text: c.text,
      postId: c.post.id,
      author: {
        displayName: `${c.author.firstName} ${c.author.lastName}`,
      },
      likeCount: c.likes.length,
      createdAt: c.createdAt,
    };
  }

  flattenCommentsToTwoLevels(comments: Comment[]) {
    return comments.map((c) => {
      return {
        ...this.mapToComment(c),
        replies: this.flattenReplies(c.replies).map(this.mapToComment),
      };
    });
  }

  //TODO ????
  private flattenReplies(replies: Comment[]): Comment[] {
    const flattened: Comment[] = [];

    const stack: Comment[] = [...replies]; // Start with the immediate replies
    while (stack.length) {
      const currentReply = stack.pop();
      if (currentReply) {
        flattened.push({ ...currentReply, replies: [] }); // Push the reply without its own nested replies
        if (currentReply.replies) {
          stack.push(...currentReply.replies); // Add its replies to the stack for processing
        }
      }
    }

    return flattened;
  }

  async likeComment(profileId: ProfileId, commentId: string) {
    const profile = await this.deps.profileRepo.getById(profileId);
    if (!profile) {
      throw new ClientError(strings.PROFILE_NOT_FOUND_ERROR);
    }

    const comment = await this.deps.commentRepo.getComment(commentId);
    if (!comment) {
      throw new ClientError(strings.COMMENT_NOT_AVAILABLE_ERROR);
    }

    const like = new CommentLike();
    like.comment = comment;
    like.user = profile;
    return this.deps.commentLikeRepo.addLikeToComment(like);
  }
}
