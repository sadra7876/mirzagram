export interface PostDetails {
  id: number;
  ownerProfileId: string;
  createdAt: string;
  caption: string;
  hashtags: never[];
  mentions: never[];
  contents: {
    url: string;
  }[];
  likeCount: number;
}
