export interface MirzaComment {
  page: number;
  data: {
    id: string;
    text: string;
    postId: string;
    author: {
      displayName: string;
    };
    likeCount: number;
    replies: {
      id: string;
      text: string;
      postId: string;
      author: {
        displayName: string;
      }[];
    }[];
  }[];
}
