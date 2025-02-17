import express, { json, NextFunction, Request, Response, text } from "express";
import { TypeUserData } from "../index";
import fs, { readFile, writeFile } from "fs/promises";
import { validateUser } from "../middlewares/validateUser";
import { modifyJSONFile } from "../utils/modifyJsonFile";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import authMiddleware from "../middlewares/authMiddleware";
import { Post, Comment } from './../types/posts';
import { parse } from "path";
import { stringify } from "querystring";
import { AxiosError } from 'axios';

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
      res.json(user);
    }
  );
});

router.get("/posts", authMiddleware, async (req: Request, res: Response) => {
  try {
    // const {username}:{username:string} = req.body.user
    const postsData = await fs.readFile("src/db/posts.json", "utf8");
    const posts: Post[] = JSON.parse(postsData)
    res.json(posts)
  }
  catch (error) {
    res.status(403).json(error);
    return;
  }
})

router.post("/likepost", authMiddleware, async (req: Request, res: Response) => {
  try {
    const postsData = await fs.readFile("src/db/posts.json", "utf8");
    const posts: Post[] = JSON.parse(postsData)
    const {liked, postId}:{liked:boolean, postId:string} = req.body
    const post = posts.find((post) => post.id == postId)
    if(post && post.likes) {
      liked?post.likes+=1:post.likes-=1
      const newPosts = posts.map(_post => _post.id==postId ? post:_post)
      await modifyJSONFile("src/db/posts.json", newPosts);
    }
    res.json(`Post ${postId} ${liked?"":"un"}liked!`)
    return
  } catch (error) {
    console.log(error);
    res.status(401)
    return
  }
})

router.post("/post-comment", authMiddleware, async (req: Request, res: Response) => {
  try {
    const postsData = await fs.readFile("src/db/posts.json", "utf8");
    const posts: Post[] = JSON.parse(postsData);

    const { userComment, user_name, postId }: { userComment: string; user_name: string; postId: string } = req.body;
    const postIndex = posts.findIndex((post) => post.id === postId);

    if (postIndex !== -1) {
      const newComment: Comment = { user:user_name, text: userComment, timestamp: new Date().toISOString().slice(0, 19) + "Z" };
      posts[postIndex].comments.push(newComment);

      await fs.writeFile("src/db/posts.json", JSON.stringify(posts, null, 2), "utf8");
      res.status(200).json({ message: "Comment added successfully", comment: newComment });
      return
    }

    res.status(404).json("Post not found" );
  } catch (error) {
    res.status(500).json("An error occurred: "+ error);
  }
});


export default router;