export {};

declare global {
  namespace Express {
    export interface Request {
      subject: string;
    }
  }
}

declare module "socket.io" {
  interface Socket {
    sessionID: string;
    subject: string;
  }
}
