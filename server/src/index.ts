import express from "express";
import http from "http";
import cors from "cors";
import compression from "compression";
import router from "./routes/routes";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import socketLogic from "./socket/messages";

const app = express();
app.use(cors({ 
    origin: "http://localhost:5173",
    credentials: true }));
app.use(compression());
app.use(express.json());
app.use(cookieParser())
app.use(router)

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

socketLogic(io)

server.listen(3030, () => {
    console.log("Server is running on http://localhost:3030");
});


