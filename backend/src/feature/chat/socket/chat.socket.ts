import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { socketAuthMiddleware } from "./socket-auth.middleware";
import {
  messageService,
  profileRepository,
  profileService,
} from "dependencies";
import { ProfileId } from "@CommonTypes/profile.type";

const app = express();
export const socketServer = createServer(app);
const io = new Server(socketServer);
io.use(socketAuthMiddleware);

io.on("connection", async (socket) => {
  const profile = await profileService.getUserProfile(
    socket.subject as any as ProfileId,
    null
  );
  socket.join(profile.username);

  socket.on("messages", async ({ targetUsername, page, pageSize }) => {
    const messages = await messageService.getConversationMessages(
      socket.subject as any as ProfileId,
      targetUsername,
      page,
      pageSize
    );
    socket.emit("messages", JSON.stringify(messages));
  });

  socket.on("private message", async ({ to, content }) => {
    const sender = await profileRepository.getById(
      socket.subject as any as ProfileId
    );
    const receiver = await profileRepository.getByUsername(to);

    if (!receiver || !sender) {
      throw new Error("Profile does not exist");
    }

    messageService.addMessage(content, sender, receiver);
    socket.to(receiver.username).emit("private message", {
      content,
      from: sender.username,
    });
  });
});
