"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET_KEY = void 0;
const express_1 = __importDefault(require("express"));
const validateUser_1 = require("../middlewares/validateUser");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const PrismaClient_1 = require("./../utils/PrismaClient");
exports.SECRET_KEY = "test_secret_key";
const router = express_1.default.Router();
router.post("/register", validateUser_1.validateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, username, email, password } = req.body;
        const newUser = yield PrismaClient_1.prisma.user.create({
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
        const token = jsonwebtoken_1.default.sign({ id: newUser.id, username: newUser.username }, exports.SECRET_KEY, { expiresIn: "10h" });
        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax" });
        res.json({ success: true, user: newUser });
    }
    catch (error) {
        res.status(403).json("Server error: " + error);
        return;
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const userExists = yield PrismaClient_1.prisma.user.findFirst({
        where: {
            AND: [
                { username },
                { password }
            ]
        }
    });
    if (!userExists) {
        res.status(400).json("Invalid username or password");
        return;
    }
    const token = jsonwebtoken_1.default.sign({ id: userExists.id, username }, exports.SECRET_KEY, { expiresIn: "10h" });
    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax" });
    res.json({ success: true, message: "Login successful" });
}));
router.get("/protected", (req, res) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    if (!token) {
        res.status(401).json("Unauthorized");
        return;
    }
    ;
    jsonwebtoken_1.default.verify(token, exports.SECRET_KEY, (err, user) => {
        if (err) {
            res.status(403).json("Invalid token");
            return;
        }
        ;
        res.json(user ? user === null || user === void 0 ? void 0 : user.username : "");
    });
});
router.get("/posts", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield PrismaClient_1.prisma.post.findMany({
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
        res.json(posts);
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}));
router.post("/likepost", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { liked, postId } = req.body;
        const post = yield PrismaClient_1.prisma.post.findUnique({
            where: { id: postId },
        });
        if (post) {
            const updatedLikes = liked ? post.likes + 1 : post.likes - 1;
            const updatedPost = yield PrismaClient_1.prisma.post.update({
                where: { id: postId },
                data: {
                    likes: updatedLikes,
                },
            });
            res.json(`Post ${postId} ${liked ? "" : "un"}liked!`);
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json("An error occurred while updating the post");
        return;
    }
}));
router.post("/post-comment", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userComment, user_name, postId } = req.body;
        const post = yield PrismaClient_1.prisma.post.findUnique({
            where: { id: postId },
            include: { comments: true }
        });
        if (post) {
            const newComment = yield PrismaClient_1.prisma.comment.create({
                data: {
                    text: userComment,
                    username: user_name,
                    postId: post.id,
                },
            });
            res.status(200).json(newComment);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred: " + error });
    }
}));
router.get("/user-profile", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
exports.default = router;
//# sourceMappingURL=routes.js.map