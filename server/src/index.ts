import express from "express";
import http from "http";
import cors from "cors";
import compression from "compression";
import router from "./routes/routes";

import cookieParser from "cookie-parser";

export type TypeUserData = {
    id: number;
    username: string;
    password: string;
    email:string;
    fullName:string;
}

const app = express();
app.use(cors({ 
    origin: "http://localhost:5173",
    credentials: true }));
app.use(compression());
app.use(express.json());
app.use(cookieParser())
app.use(router)


const server = http.createServer(app);

server.listen(3030, () => {
    console.log("Server is running on http://localhost:3030");
});


