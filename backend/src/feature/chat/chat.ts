import { socketServer } from "main";
import { Server } from "socket.io";

const io = new Server(socketServer);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.join(socket.id);
  // console.log(`User joined room: ${socket.id}`);

  socket.emit("session", {
    sessionID: socket.sessionID,
    // subject: socket.subject,
  });

  // Listen for chat message event
  // socket.on("chatMessage", (msg) => {
  //   console.log("Message received: " + msg);

  //   // Broadcast the message to all connected clients
  //   io.emit("chatMessage", msg);
  // });

  socket.on("private message", ({ content, to }) => {
    socket.to(to).emit("private message", {
      content,
      from: socket.id,
    });
  });

  // socket.on("joinRoom", ({ room }) => {
  //   socket.join(room);
  //   console.log(`User joined room: ${room}`);
  // });

  // socket.on("privateMessage", ({ room, message }) => {
  //   console.log(`received on privateMessage: ${message}`);
  //   io.to(room).emit(message); // Send message to users in the room
  // });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
