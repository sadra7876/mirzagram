import { Response } from "express";

export const handleHttpRequest = async <A>(
  res: Response,
  fn: () => Promise<A>
) => {
  try {
    res.send(await fn());
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).send(e.message);
    } else {
      res.status(500).send(e);
    }
  }
};
