"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketLogic = (io) => {
    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};
exports.default = socketLogic;
//# sourceMappingURL=messages.js.map