import { verifyAccessToken } from "@feature/auth/utils/jwt.utils";
import { NextFunction } from "express";
import { Socket } from "socket.io";
import { v4 as uuid } from "uuid";

const sessionStore: Record<string, string> = {};

export const socketAuthMiddleware = (socket: Socket, next: NextFunction) => {
  // console.log(socket.handshake.headers.authorization);
  if (!socket.handshake.headers.authorization) {
    return next(new Error("Not authorized"));
  }
  const jwt = verifyAccessToken(socket.handshake.headers.authorization);
  const sessionID = socket.handshake.headers.sessionID?.toString();
  if (sessionID) {
    // find existing session
    const session = sessionStore[jwt.payload?.sub || ""];
    if (session) {
      socket.sessionID = sessionID;
      // socket.userID = session.userID;
      socket.subject = session;
      return next();
    }
  }
  const subject = jwt.payload?.sub;
  if (!subject) {
    return next(new Error("invalid subject"));
  }
  // create new session
  socket.sessionID = uuid();
  // socket.userID = randomId();
  socket.subject = subject;
  next();
};
