import express, { json, NextFunction, Request, Response } from "express";
import { TypeUserData } from "../index";
import fs from "fs/promises";
import { validateUser } from "../middlewares/validateUser";
import { modifyJSONFile } from "../utils/modifyJsonFile";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import authMiddleware from "../middlewares/authMiddleware";
import { Post } from './../types/posts';

export const SECRET_KEY = "test_secret_key";

const router = express.Router();

router.post("/register", validateUser, async (req: Request, res: Response) => {
  try {
    const fileData = await fs.readFile("src/db/users.json", "utf8");
    const data: TypeUserData[] = JSON.parse(fileData);
    const newUser: TypeUserData = { id: Date.now(), ...req.body };
    const newData = [...data, newUser];
    await modifyJSONFile("src/db/users.json", newData);
    const token = jwt.sign({ id: newUser.id, username: newUser.username }, SECRET_KEY, { expiresIn: "10h" });
    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax" });
    res.json({ success: true, user: newUser });

  } catch (error) {
    res.status(403).json(error);
    return;
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const fileData = await fs.readFile("src/db/users.json", "utf8");
  const data: TypeUserData[] = JSON.parse(fileData);
  const user = data.find((u) => u.username === username && u.password === password);
  if (!user) {
    res.status(403).json("Invalid username or password");
    return;
  }
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "10h" });
  res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax" });
  res.json({ success: true, message: "Login successful" });
});

router.get("/protected", (req: Request, res: Response) => {
  const token = req.cookies?.token;
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return
  };

  jwt.verify(
    token,
    SECRET_KEY,
    (err: VerifyErrors | null, user: JwtPayload | string | undefined) => {
      if (err) {
        res.status(403).json("Invalid token");
        return
      };
      res.json("Access granted to user " + JSON.stringify(user));
    }
  );
});

router.get("/posts", authMiddleware, async (req:Request, res:Response) => {
  try {
  // const {username}:{username:string} = req.body.user
  const postsData = await fs.readFile("src/db/posts.json", "utf8");
  const posts:Post[] = JSON.parse(postsData)
  res.json(posts)
  }
  catch (error) {
    res.status(403).json(error);
    return;
  }
})

export default router;