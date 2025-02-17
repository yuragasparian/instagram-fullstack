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
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, username, email, password } = req.body;
        const existingUser = yield prisma.user.findFirst({
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
        const newUser = yield prisma.user.create({
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
        const token = jwt.sign({ id: newUser.id, username: newUser.username }, SECRET_KEY, { expiresIn: "10h" });
        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax" });
        res.json({ success: true, user: newUser });
    }
    catch (error) {
        res.status(403).json("Server error: " + error);
        return;
    }
});
exports.register = register;
//# sourceMappingURL=register.controller.js.map