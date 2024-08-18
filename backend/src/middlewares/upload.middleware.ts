import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";
import fs from "fs";
import { z } from "zod";

const uploadsBaseDir = path.resolve(process.cwd(), "uploads");
const ensureDirectoryExists = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};
// Set up the storage directory and filename format
const uploadBody = z.union([z.literal("profile"), z.literal("post")]);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const typeOfFile = uploadBody.parse(req.body.type);

    let uploadPath = "";
    if (typeOfFile === "post") {
      uploadPath = path.join(uploadsBaseDir, "posts");
    } else if (typeOfFile === "profile") {
      uploadPath = path.join(uploadsBaseDir, "profiles");
    } else {
      uploadPath = path.join(uploadsBaseDir, "others");
    }
    ensureDirectoryExists(uploadPath);

    cb(null, uploadPath); // Use the resolved path
  },
  filename(_, file: Express.Multer.File, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// File validation logic
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only .jpg, .jpeg, .png, and .webp formats are allowed!"));
  }
};

// Create the multer upload middleware
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit for file size
    files: 20, // 5 files limit
  },
});
