import express, { json, Request, Response, } from "express";
import { validateUser } from "../middlewares/validateUser";
import jwt, { JwtPayload, sign, VerifyErrors } from "jsonwebtoken";
import authMiddleware from "../middlewares/authMiddleware";
import { prisma } from './../utils/PrismaClient';
import { TypeUserData, User } from '../types/types';
import { filter } from "compression";
import { error } from "console";

export const SECRET_KEY = "test_secret_key";

const router = express.Router();

router.post("/register", validateUser, async (req: Request, res: Response) => {
  try {
    const { fullName, username, email, password }: TypeUserData = req.body;
    const newUser = await prisma.user.create({
      data: {
        fullName,
        username,
        email,
        password,
        follows: [],
        followers: [],
        liked: [],
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

  interface IUserPayload extends JwtPayload {
    username: string
    id: string
  }

  jwt.verify(
    token,
    SECRET_KEY,
    async (err: VerifyErrors | null, user: JwtPayload | string | undefined) => {
      if (err) {
        res.status(403).json("Invalid token");
        return
      };
      const userPayload: IUserPayload = typeof user === "string" ? JSON.parse(user) : user;
      const userId = userPayload.id;

      const userData = await prisma.user.findUnique({
        where: { id: userId },
      });

      res.json(userData);

    }
  );
});

router.get("/posts", authMiddleware, async (req: Request, res: Response) => {
  const { postId } = req.query
  let post;
  try {
    if (!postId) {
      post = await prisma.post.findMany({
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
    } else {
      if (typeof postId !== 'string') {
        res.status(400).json("Post ID is required");
        return
      }
      post = await prisma.post.findUnique({
        where: {
          id: postId
        }, include: {
          author: {
            select: {
              username: true,
              profile_picture: true,
            }
          },
          comments: true
        },
      })
    }

    res.json(post)
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }

})


router.post("/likepost", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { userId, liked, postId }: { userId: string; liked: boolean; postId: string } = req.body;

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return
    }

    const updatedLikes = liked ? post.likes + 1 : Math.max(post.likes - 1, 0);

    await prisma.post.update({
      where: { id: postId },
      data: { likes: updatedLikes },
    });

    await prisma.user.update({
      where: { id: userId },
      data: {
        liked: liked
          ? { push: postId }
          : { set: (await prisma.user.findUnique({ where: { id: userId } }))?.liked.filter((id) => id !== postId) || [] }, // Remove post ID if unliked
      },
    });

    res.json({ message: `Post ${postId} ${liked ? "liked" : "unliked"}!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while updating the post and user likes" });
  }
});


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
  const { username } = req.query
  if (typeof username !== 'string') {
    res.status(400).json("Username is required");
    return
  }
  try {
    const user = await prisma.user.findUnique(
      {
        where: { username: username },
        include: { posts: true }
      }
    )
    if (user) {
      res.status(200).json(user)
      return
    }

  }
  catch (err) {
    res.status(500).json({ err, message: "An error occurred while getting user information" });
  }
}
)

export default router;