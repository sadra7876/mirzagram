import { DataSource, InsertResult, Repository } from "typeorm";
import { ForgetPasswordToken } from "./token.entity";
import { Profile } from "feature/profile/repository/profile.entity";
import { Email } from "@CommonTypes/profile.type";

export interface ITokenRepository {
  getByToken(token: string): Promise<ForgetPasswordToken | null>;
  createOrUpdate(auth: ForgetPasswordToken): Promise<ForgetPasswordToken>;
  expireToken(auth: ForgetPasswordToken): Promise<ForgetPasswordToken>;
  getByProfileEmail(email: Email): Promise<ForgetPasswordToken | null>;
  // getExpirationDate(token: string): Promise<ForgetPasswordToken | null>;
  // getProfileByAccessToken(token: string): Promise<ForgetPasswordToken | null>;
}

export class TokenRepository implements ITokenRepository {
  private readonly repo: Repository<ForgetPasswordToken>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(ForgetPasswordToken);
  }

  // async getById(a: number): Promise<ForgetPasswordToken | null> {
  //   return await this.repo.findOneBy({  });
  // }

  async createOrUpdate(accessToken: ForgetPasswordToken) {
    return this.repo.save(accessToken);
  }

  async getByToken(token: string): Promise<ForgetPasswordToken | null> {
    return await this.repo.findOneBy({ resetPasswordToken: token });
  }

  async getByProfileEmail(email: Email): Promise<ForgetPasswordToken | null> {
    return await this.repo.findOneBy({ profileEmail: email });
  }
  // async getExpirationDate(token: string): Promise<ForgetPasswordToken | null> {
  //   return await this.repo.findOneBy({ resetPasswordToken: token });
  // }
  async getProfileByAccessToken(
    token: string
  ): Promise<ForgetPasswordToken | null> {
    return await this.repo.findOneBy({ resetPasswordToken: token });
  }

  async expireToken(accessToken: ForgetPasswordToken) {
    accessToken.expired = true;
    return await this.repo.save({ ...accessToken, expired: true });
  }

  // async deleteToken(user: Profile) {
  //   return await this.repo.delete({ resetPasswordToken: token });
  // }
}
