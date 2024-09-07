export interface PostDetails {
  id: number;
  ownerProfileId: string;
  createdAt: string;
  caption: string;
  hashtags: HashTag[];
  mentions: never[];
  contents: {
    url: string;
  }[];
  likeCount: number;
}
export interface HashTag {
  tag: string;
}
