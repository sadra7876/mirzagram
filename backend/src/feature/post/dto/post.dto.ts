import { ProfileId } from "@CommonTypes/profile.type";
import { HashtagDTO } from "./hashtag.dto";
import { ContentDTO } from "./content.dto";
import { MentionDTO } from "./mentions.dto";

export type PostDTO = {
  id: string;
  ownerProfileId: ProfileId;
  owner: {
    username: string;
    firstName?: string;
    lastName?: string;
    profilePicture: string;
  };
  createdAt: Date;
  caption?: string;
  hashtags?: HashtagDTO[];
  mentions?: MentionDTO[];
  contents: ContentDTO[];
  likeCount: number;
};
