import express, { json, NextFunction, Request, Response, text } from "express";
import fs from "fs/promises";
import { validateUser } from "../middlewares/validateUser";
import { modifyJSONFile } from "../utils/modifyJsonFile";
import jwt, { JwtPayload, sign, VerifyErrors } from "jsonwebtoken";
import authMiddleware from "../middlewares/authMiddleware";
import { Post, Comment } from '../types/types';
import { prisma } from './../utils/PrismaClient';
import { TypeUserData } from '../types/types';
import { create } from "domain";

export const SECRET_KEY = "test_secret_key";

const router = express.Router();

router.post("/register", validateUser, async (req: Request, res: Response) => {
  try {
    const { fullName, username, email, password }: TypeUserData = req.body;
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username },
        ],
      },
    });

    if (existingUser) {
      res.status(400).json("User with this email or username already exists");
      return
    }

    const newUser = await prisma.user.create({
      data: {
        fullName,
        username,
        email,
        password,
        follows: [],
        followers: [],
        profile_picture: "",
      },
    });

    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      SECRET_KEY,
      { expiresIn: "10h" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax" });
    res.json({ success: true, user: newUser });

  } catch (error) {
    res.status(403).json("Server error: " + error);
    return;
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { username, password }: Omit<TypeUserData, "id" | "email" | "fullName"> = req.body
  const userExists = await prisma.user.findFirst({
    where: {
      AND: [
        { username },
        { password }
      ]
    }
  })
  if (!userExists) {
    res.status(400).json("Invalid username or password");
    return
  }

  const token = jwt.sign({ id: userExists.id, username }, SECRET_KEY, { expiresIn: "10h" });
  res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax" });
  res.json({ success: true, message: "Login successful" });

});

router.get("/protected", (req: Request, res: Response) => {
  const token = req.cookies?.token;
  if (!token) {
    res.status(401).json("Unauthorized");
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
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            username: true,
            profile_picture: true,
          }
        },
        comments: true
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    });
    res.json(posts)
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
})

router.post("/likepost", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { liked, postId }: { liked: boolean, postId: string } = req.body

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (post) {
      const updatedLikes = liked ? post.likes + 1 : post.likes - 1;

      const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: {
          likes: updatedLikes,
        },
      });

      res.json(`Post ${postId} ${liked ? "" : "un"}liked!`)
      return
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).json("An error occurred while updating the post");
    return
  }
})

router.post("/post-comment", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { userComment, user_name, postId }: { userComment: string; user_name: string; postId: string } = req.body;

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { comments: true }
    });

    if (post) {
      const newComment = await prisma.comment.create({
        data: {
          text: userComment,
          username: user_name,
          postId: post.id,
        },
      });

      res.status(200).json(newComment);
    } 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred: " + error });
  }
});

router.get("/user-profile", async (req: Request, res: Response) => {

}
)

export default router;