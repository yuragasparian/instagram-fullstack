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
exports.validateUser = void 0;
const PrismaClient_1 = require("../utils/PrismaClient");
const validateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, username, email, password } = req.body;
    if (!username || !password) {
        res.status(401).json("Username and password are required.");
        return;
    }
    if (typeof username !== "string" || typeof password !== "string") {
        res.status(401).json("Username and password must be strings.");
        return;
    }
    if (username.length < 3 || username.length > 20) {
        res.status(401).json("Username must be between 3 and 20 characters long.");
        return;
    }
    if (password.length < 6) {
        res.status(401).json("Password must be at least 6 characters long.");
        return;
    }
    try {
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
        next();
    }
    catch (error) {
        console.error("Error reading database:", error);
        res.status(500).json("Internal server error.");
        return;
    }
});
exports.validateUser = validateUser;
//# sourceMappingURL=validateUser.js.map