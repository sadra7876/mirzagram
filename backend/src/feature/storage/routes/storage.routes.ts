import { Router, Request, Response } from "express";
import { handleRequest } from "../../../utils/handle-request";
import { ApiSuccess } from "@utils/http-response";
import { upload } from "middlewares/upload.middleware";
import { strings } from "resources/strings";
import { storageService } from "dependencies";
import { uploadType } from "../dto/upload-file.dto";
import { authMiddleware } from "middlewares/auth.middleware";
export const storageRouter = Router();
storageRouter.use(authMiddleware);

storageRouter.post("/", upload.array("file"), (req: Request, res: Response) => {
  handleRequest(res, async () => {
    const uploadFiles = await storageService.uploadFiles(
      req.files as Express.Multer.File[],
      uploadType.parse(req.body.type)
    );
    return new ApiSuccess(uploadFiles, [strings.FILE_UPLOAD_SUCCESSFUL]);
  });
});
