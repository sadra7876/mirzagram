import { ProfileId, Username } from "@CommonTypes/profile.type";
import { IProfileRepository } from "@feature/profile/repository/profile.repo";
import { IMessageRepository } from "../repository/message.repo";
import { Message } from "../repository/message.entity";
import { Profile } from "@feature/profile/repository/profile.entity";
import { strings } from "resources/strings";
import { ClientError } from "@utils/http-error";
import { convertFileNameToURL } from "@utils/utils";

interface Dependencies {
  messageRepo: IMessageRepository;
  profileRepo: IProfileRepository;
}

export class MessageService {
  constructor(private readonly deps: Dependencies) {}

  async addMessage(m: string, from: Profile, to: Profile) {
    const message = new Message();
    message.message = m;
    message.from = from;
    message.to = to;
    await this.deps.messageRepo.insertMessage(message);
  }

  async getConversations(profileId: ProfileId) {
    const profile = await this.deps.profileRepo.getById(profileId);
    if (!profile || !profile.isActive) {
      throw new ClientError(strings.PROFILE_NOT_FOUND_ERROR);
    }

    const convs = await this.deps.messageRepo.getConversations(profileId);
    const result = await Promise.all(
      convs.map(async (c) => {
        const profile = await this.deps.profileRepo.getById(c.targetUserId);

        return {
          id: c.targetUserId,
          targetUserId: c.targetUserId,
          createdAt: c.createdAt,
          message: c.message,
          user: {
            displayName: `${profile?.firstName} ${profile?.lastName}`,
            profilePictureURL: convertFileNameToURL(
              profile?.profilePicture || "",
              "profile"
            ),
          },
        };
      })
    );
    return result;
  }

  async getConversationMessages(
    authUserId: ProfileId,
    targetUsername: string,
    page: number,
    pageSize: number
  ) {
    const authUser = await this.deps.profileRepo.getById(authUserId);
    if (!authUser || !authUser.isActive) {
      throw new ClientError(strings.PROFILE_NOT_FOUND_ERROR);
    }

    const target = await this.deps.profileRepo.getByUsername(
      targetUsername as any as Username
    );
    if (!target || !target.isActive) {
      throw new ClientError(strings.PROFILE_NOT_FOUND_ERROR);
    }

    const messages = await this.deps.messageRepo.getConversationMessages(
      authUser.id,
      target.id,
      page,
      pageSize
    );
    return messages.map((m) => {
      return {
        id: m.id,
        message: m.message,
        from: m.from,
      };
    });
  }
}
