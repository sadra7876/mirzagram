import { IStorageRepository } from "../repository/storage.repo";
import { Storage } from "../repository/storage.entity";
import { ClientError } from "@utils/http-error";
interface Dependencies {
  storageRepo: IStorageRepository;
}

export class StorageService {
  constructor(private readonly deps: Dependencies) {}

  async uploadFiles(
    files: Express.Multer.File[],
    fileType: "profile" | "post" | string
  ) {
    if (!files || files.length === 0) {
      throw new ClientError("No files uploaded");
    }
    const newFiles: Storage[] = [];
    for (const file of files) {
      const newFile = new Storage();
      newFile.fileName = file.filename;
      newFile.path = file.path;
      newFile.timeCreated = new Date();
      if (fileType === "profile" || fileType === "post")
        newFile.uploadType = fileType;
      const i = await this.deps.storageRepo.createOrUpdate(newFile);
      newFiles.push(i);
    }
    return newFiles;
  }

  async getFileByName(name: string) {
    return this.deps.storageRepo.getByName(name);
  }
}
