import { Repository } from "typeorm";
import { Message } from "./message.entity";
import { ProfileId } from "@CommonTypes/profile.type";

export interface IMessageRepository {
  insertMessage(message: Message): Promise<Message>;
  getConversations(profileId: ProfileId): Promise<any[]>;
  getConversationMessages(
    profileId: ProfileId,
    targetId: ProfileId,
    page: number,
    pageSize: number
  ): Promise<Message[]>;
}

export class MessageRepository implements IMessageRepository {
  constructor(private readonly repo: Repository<Message>) {}

  insertMessage(message: Message): Promise<Message> {
    return this.repo.save(message);
  }

  getConversations(profileId: ProfileId): Promise<any[]> {
    return this.repo
      .createQueryBuilder("message")
      .select(
        `message, "createdAt", CASE 
      WHEN message."toId" = :userId THEN message."toId"
      WHEN message."fromId" = :userId THEN message."fromId" 
      ELSE message."toId"
      END AS "targetUserId"`
      )
      .setParameter("userId", profileId)
      .distinctOn([`"targetUserId"`])
      .orderBy(`"targetUserId"`)
      .addOrderBy(`"createdAt"`, "DESC")
      .getRawMany();
  }

  getConversationMessages(
    profileId: ProfileId,
    targetId: ProfileId,
    page: number,
    pageSize: number
  ) {
    return this.repo.find({
      where: [
        {
          from: {
            id: profileId,
          },
          to: {
            id: targetId,
          },
        },
        {
          from: {
            id: targetId,
          },
          to: {
            id: profileId,
          },
        },
      ],
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
  }
}
