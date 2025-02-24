import { Notif } from "@/types/posts";
import socket from "./socket";

const sendNotification = (notification: Notif) => {
    socket.emit("sendNotification", notification);
};

export default sendNotification