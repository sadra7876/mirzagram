export type CommentDTO = {
  id: string;
  text: string;
  postId: string;
  replies?: any;
  author: {
    displayName: string;
  };
  likeCount: number;
  createdAt: Date;
};
