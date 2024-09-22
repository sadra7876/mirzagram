import { DataSource, Repository } from "typeorm";
import { FollowRequest } from "./entities/follow-request.entity";
// import { ProfileId } from "@CommonTypes/profile.type";
import { Profile } from "@feature/profile/repository/profile.entity";
import { ProfileId } from "@CommonTypes/profile.type";
// import { Profile } from "@feature/profile/repository/profile.entity";

export interface IFollowRequestRepository {
  createFollowRequest(requester: Profile, requested: Profile): Promise<string>;
  getFollowRequestById(id: string): Promise<FollowRequest | null>;
  getRecivedRequests(
    requested: ProfileId,
    page: number,
    pageLimit: number
  ): Promise<FollowRequest[]>;
  getSentRequests(
    requesterId: ProfileId,
    page: number,
    pagelimit: number
  ): Promise<FollowRequest[]>;
  getFollowRequestByBoth(
    requesterId: ProfileId,
    requestedId: ProfileId
  ): Promise<FollowRequest | null>;
  deleteFollowRequest(id: string): Promise<void>;
}

export class FollowRequestRepository implements IFollowRequestRepository {
  private readonly repository: Repository<FollowRequest>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(FollowRequest);
  }

  async createFollowRequest(
    requester: Profile,
    requested: Profile
  ): Promise<string> {
    const followRequest = new FollowRequest();
    followRequest.requester = requester;
    followRequest.requested = requested;
    const result = await this.repository.save(followRequest);
    console.log(result);
    return result.id;
  }

  async getFollowRequestById(id: string): Promise<FollowRequest | null> {
    return this.repository
      .createQueryBuilder("followRequest")
      .where("followRequest.id = :id", { id })
      .getOne();
  }

  async getRecivedRequests(
    requestedId: ProfileId,
    page: number,
    pageLimit: number
  ): Promise<FollowRequest[]> {
    return this.repository
      .createQueryBuilder("followRequest")
      .leftJoinAndSelect("followRequest.requester", "requester")
      .leftJoinAndSelect("followRequest.requested", "requested")
      .where("followRequest.requested = :requestedId", { requestedId })
      .orderBy("followRequest.createdAt", "DESC")
      .skip((page - 1) * pageLimit)
      .take(pageLimit)
      .getMany();
  }

  async getSentRequests(
    requesterId: ProfileId,
    page: number,
    pageLimit: number
  ): Promise<FollowRequest[]> {
    return this.repository
      .createQueryBuilder("followRequest")
      .leftJoinAndSelect("followRequest.requester", "requester")
      .leftJoinAndSelect("followRequest.requested", "requested")
      .where("followRequest.requester = :requesterId", { requesterId })
      .orderBy("followRequest.createdAt", "DESC")
      .skip((page - 1) * pageLimit)
      .take(pageLimit)
      .getMany();
  }

  async getFollowRequestByBoth(
    requesterId: ProfileId,
    requestedId: ProfileId
  ): Promise<FollowRequest | null> {
    return (
      this.repository
        .createQueryBuilder("followRequest")
        .leftJoinAndSelect("followRequest.requester", "requester")
        .leftJoinAndSelect("followRequest.requested", "requested")
        .where("followRequest.requested = :requestedId", { requestedId })
        // .andWhere("followRequest.requester = :requesterId", { requesterId })
        .getOne()
    );
  }

  async deleteFollowRequest(id: string): Promise<void> {
    await this.repository
      .createQueryBuilder("followRequest")
      .leftJoinAndSelect("followRequest.requester", "requester")
      .leftJoinAndSelect("followRequest.requested", "requested")
      .delete()
      .from(FollowRequest)
      .where("id = :id", { id })
      .execute();
  }
}
