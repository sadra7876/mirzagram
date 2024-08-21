import { UPLOADTYPE } from "./upload.enum";

export interface UploadFile {
  fileName: string;
  paths: string;
  timeCreated: string;
  uploadType: UPLOADTYPE;
}
