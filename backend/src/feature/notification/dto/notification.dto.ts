export type NotificationDTO = {
  id: string;
  thumbnail: string;
  title: string;
  subtitle: string;
  isSeen: boolean;
  type:
    | "LIKE"
    | "FOLLOW"
    | "MENTION"
    | "FOLLOW_REQUEST"
    | "FOLLOW_REQUEST_RESULT";
};
