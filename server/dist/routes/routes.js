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
const promises_1 = __importDefault(require("fs/promises"));
const validateUser_1 = require("../middlewares/validateUser");
const modifyJsonFile_1 = require("../utils/modifyJsonFile");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const PrismaClient_1 = require("./../utils/PrismaClient");
exports.SECRET_KEY = "test_secret_key";
const router = express_1.default.Router();
router.post("/register", validateUser_1.validateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, username, email, password } = req.body;
        const existingUser = yield PrismaClient_1.prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username },
                ],
            },
        });
        if (existingUser) {
            res.status(400).json("User with this email or username already exists");
            return;
        }
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
    const fileData = yield promises_1.default.readFile("src/db/users.json", "utf8");
    const data = JSON.parse(fileData);
    const user = data.find((u) => u.username === username && u.password === password);
    if (!user) {
        res.status(403).json("Invalid username or password");
        return;
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, exports.SECRET_KEY, { expiresIn: "10h" });
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
        res.json(user);
    });
});
router.get("/posts", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const {username}:{username:string} = req.body.user
        const postsData = yield promises_1.default.readFile("src/db/posts.json", "utf8");
        const posts = JSON.parse(postsData);
        res.json(posts);
    }
    catch (error) {
        res.status(403).json(error);
        return;
    }
}));
router.post("/likepost", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postsData = yield promises_1.default.readFile("src/db/posts.json", "utf8");
        const posts = JSON.parse(postsData);
        const { liked, postId } = req.body;
        const post = posts.find((post) => post.id == postId);
        if (post && post.likes) {
            liked ? post.likes += 1 : post.likes -= 1;
            const newPosts = posts.map(_post => _post.id == postId ? post : _post);
            yield (0, modifyJsonFile_1.modifyJSONFile)("src/db/posts.json", newPosts);
        }
        res.json(`Post ${postId} ${liked ? "" : "un"}liked!`);
        return;
    }
    catch (error) {
        console.log(error);
        res.status(401);
        return;
    }
}));
router.post("/post-comment", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postsData = yield promises_1.default.readFile("src/db/posts.json", "utf8");
        const posts = JSON.parse(postsData);
        const { userComment, user_name, postId } = req.body;
        const postIndex = posts.findIndex((post) => post.id === postId);
        if (postIndex !== -1) {
            const newComment = { user: user_name, text: userComment, timestamp: new Date().toISOString().slice(0, 19) + "Z" };
            posts[postIndex].comments.push(newComment);
            yield promises_1.default.writeFile("src/db/posts.json", JSON.stringify(posts, null, 2), "utf8");
            res.status(200).json({ message: "Comment added successfully", comment: newComment });
            return;
        }
        res.status(404).json("Post not found");
    }
    catch (error) {
        res.status(500).json("An error occurred: " + error);
    }
}));
router.get("/user-profile", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
exports.default = router;
//# sourceMappingURL=routes.js.map