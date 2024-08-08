import { Response } from "express";
import { HttpError } from "@utils/http-error";
import { ZodError } from "zod";

export const handleRequest = async <F>(
  res: Response,
  fn: () => Promise<F>,
  defaultStatusCode: number = 200
) => {
  try {
    const data = await fn();
    res.status(defaultStatusCode).send(data);
  } catch (e) {
    if (e instanceof HttpError) {
      return res.status(e.statusCode).send({ messege: e.message });
    } else if (e instanceof ZodError) {
      return res.status(400).send({ messege: e.errors });
    } else if (e instanceof Error) {
      return res.status(500).send(e.message);
    } else {
      return res.status(500).send("Internal server error");
    }
  }
};
