import { create } from "domain";
import { emit, on } from "process";
import { Server, Socket } from "socket.io";
import { Message } from "../types/types";
import { prisma } from "../utils/PrismaClient";
import { log } from "console";
import { join } from "path";

async function sendMessage(senderId: string, recieverId: string, messageText: string) {
  return await prisma.message.create({
    data: {
      content: messageText,
      senderId: senderId,
      recieverId: recieverId,
    },
  });
}

async function getMessagesBetweenUsers(user1: string, user2: string) {
  return await prisma.message.findMany({
    where: {
      OR: [
        { senderId: user1, recieverId: user2 },
        { senderId: user2, recieverId: user1 },
      ],
    },
    orderBy: { createdAt: "asc" },
  });
}



const socketLogic = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("A user connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });

    socket.on("sendMessage", async (data: Message) => {
      console.log(`Message from ${JSON.stringify(data)}`);
      const savedMessage = await sendMessage(data.senderId, data.receiverId, data.content);
      io.to(data.receiverId).emit("receiveMessage", savedMessage);
    });

    socket.on("getMessages", async ({ user1, user2 }) => {
      const messages = await getMessagesBetweenUsers(user1, user2);
      socket.emit("chatHistory", messages);
    });

    socket.on("joinRoom", (userId) => {
      if (userId) {
        socket.join(userId);
        console.log(`User ${userId} joined room`);
      }
    });

    socket.on("joinNotificationRoom", (userId) => {
      socket.join(`notif-${userId}`);
      console.log(`User joined notification room: notif-${userId}`);
    });

    socket.on("sendNotification", ({ receiverId, type, senderId, content }) => {
      const notification = { type, senderId, content };
      io.to(`notif-${receiverId}`).emit("newNotification", notification);
      console.log(`Notification sent to ${receiverId}:`, notification);
    });
  });
};

export default socketLogic;