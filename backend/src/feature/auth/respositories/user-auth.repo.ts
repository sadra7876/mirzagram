import { DataSource, Repository } from "typeorm";
import { UserAuth } from "./user-auth.entity";

export interface IUserAuthRepository {
  createOrUpdate(auth: UserAuth): Promise<UserAuth>;
  getByUsername(username: string): Promise<UserAuth | null>;
  getByEmail(email: string): Promise<UserAuth | null>;
}

export class UserAuthRepository implements IUserAuthRepository {
  
  private userAuthRepository: Repository<UserAuth>;

  constructor(dataSource: DataSource) {
    this.userAuthRepository = dataSource.getRepository(UserAuth);
  }

  async createOrUpdate(auth: UserAuth) {
    return await this.userAuthRepository.save(auth);
  }

  async getByUsername(username: string) {
    return await this.userAuthRepository.findOneBy({ username });
  }

  async getByEmail(email: string) {
    return await this.userAuthRepository.findOneBy({ email });
  }
}
