import { DataSource, Repository } from "typeorm";
import { ForgetPasswordToken } from "./token.entity";
import { Email } from "@CommonTypes/profile.type";

export interface ITokenRepository {
  getByToken(token: string): Promise<ForgetPasswordToken | null>;
  createOrUpdate(auth: ForgetPasswordToken): Promise<ForgetPasswordToken>;
  expireToken(auth: ForgetPasswordToken): Promise<ForgetPasswordToken>;
  getByProfileEmail(email: Email): Promise<ForgetPasswordToken | null>;
}

export class TokenRepository implements ITokenRepository {
  private readonly repo: Repository<ForgetPasswordToken>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(ForgetPasswordToken);
  }

  async createOrUpdate(accessToken: ForgetPasswordToken) {
    return this.repo.save(accessToken);
  }

  async getByToken(token: string): Promise<ForgetPasswordToken | null> {
    return this.repo.findOneBy({ resetPasswordToken: token });
  }

  async getByProfileEmail(email: Email): Promise<ForgetPasswordToken | null> {
    return this.repo.findOneBy({ profileEmail: email });
  }

  async getProfileByAccessToken(
    token: string
  ): Promise<ForgetPasswordToken | null> {
    return this.repo.findOneBy({ resetPasswordToken: token });
  }

  async expireToken(accessToken: ForgetPasswordToken) {
    accessToken.expired = true;
    return this.repo.save({ ...accessToken, expired: true });
  }
}
