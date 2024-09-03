export interface MirzaComment {
  page: number;
  data: CommentBody[];
}

export interface CommentBody {
  id: string;
  text: string;
  postId: string;
  author: {
    displayName: string;
  };
  likeCount: number;
  replies: CommentBody[];
}
