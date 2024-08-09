import { Response } from "express";
import { HttpError } from "@utils/http-error";
import { ZodError } from "zod";
import { ApiError, ApiResponse } from "./http-response";
import { strings } from "resources/strings";

export const handleRequest = async <F>(
  res: Response,
  fn: () => Promise<ApiResponse<F>>,
) => {
  try {
    const response = await fn();
    res.status(response.statusCode).send(response);
  } catch (e) {
    if (e instanceof HttpError) {
      return res.status(e.statusCode).send(new ApiError(e.statusCode, null, [e.message]));
    }
    if(e instanceof ZodError) {
      let messages = e.errors.map((e) => {
        return e.message
      })
      return res.status(400).send(new ApiError(400, null, messages));
    }
    if(e instanceof Error) {
      return res.status(500).send(new ApiError(500, null, [e.message]));
    }
    
    return res.status(500).send(new ApiError(500, null, [strings.INTERNAL_SERVER_ERROR]));
  }
};
