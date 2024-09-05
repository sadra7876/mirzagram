import { ContentDTO } from "@feature/post/dto/content.dto";

export type ExploreResponseDTO = {
  id: string;
  contents: ContentDTO[];
  likeCount: number;
  bookmarkCount: number;
  commentCount: number;
  ownerProfilePicture?: string;
  firstName?: string;
  lastName?: string;
  followerCount: number;
};
