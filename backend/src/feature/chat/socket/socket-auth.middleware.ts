import { verifyAccessToken } from "@feature/auth/utils/jwt.utils";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

export const socketAuthMiddleware = (
  socket: Socket,
  next: (err?: ExtendedError) => void
) => {
  if (!socket.handshake.headers.authorization) {
    return next(new Error("Not authorized"));
  }
  const jwt = verifyAccessToken(socket.handshake.headers.authorization);
  const subject = jwt.payload?.sub;
  if (!subject) {
    return next(new Error("invalid subject"));
  }
  socket.subject = subject;
  next();
};
