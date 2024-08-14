import { DataSource, Repository } from "typeorm";
import { Storage } from "./storage.entity";
export interface IStorageRepository {
  createOrUpdate(file: Storage): Promise<Storage>;
  getByName(name: string): Promise<Storage | null>;
}

export class StorageRepository implements IStorageRepository {
  private readonly repo: Repository<Storage>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(Storage);
  }

  async createOrUpdate(file: Storage) {
    return this.repo.save(file);
  }

  async getByName(name: string): Promise<Storage | null> {
    return await this.repo.findOneBy({ fileName: name });
  }
}
