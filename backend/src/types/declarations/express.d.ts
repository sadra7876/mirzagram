import { ProfileId } from "@CommonTypes/profile.type";
import { Request } from "express";

export {}

declare global {
  namespace Express {
    export interface Request {
      subject: string
    }
  }
}