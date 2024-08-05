import { Response } from "express";
// import { HttpStatusCode } from "./http-codes";
import { HttpError } from "./http-error";

export const handleRequest = <F>(
  res: Response,
  fn: () => F,
  defaultStatusCode: number = 200
) => {
  try {
    const data = fn();
    res.status(defaultStatusCode).send(data);
  } catch (e) {
    if (e instanceof HttpError) {
      res.status(e.statusCode).send({ messege: e.message });
      return;
    }
    res.status(500).send("Internal server error");
  }
};
