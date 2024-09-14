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
  bookmarkCount: number;
  isLiked: boolean;
  isBookmarked: boolean;

  owner: {
    firstName?: string;
    lastName?: string;
    username: string;
    profilePicture: string;
  };
}
export interface HashTag {
  tag: string;
}
