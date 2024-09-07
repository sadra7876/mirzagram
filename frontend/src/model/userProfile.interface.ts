export interface UserProfileModel {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  isPrivate?: boolean;
  bio?: string;
  username?: string;
  profilePicture?: string | null;
  postCount?: number;
  followerCount?: number;
  followingCount?: number;
}
