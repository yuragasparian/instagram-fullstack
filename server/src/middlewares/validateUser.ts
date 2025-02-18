import { Request, Response, NextFunction } from "express";
import { TypeUserData } from "../types/types";
import { prisma } from "../utils/PrismaClient";

export const validateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { fullName, username, email, password }: TypeUserData = req.body;

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
        next();
    } catch (error) {
        console.error("Error reading database:", error);
        res.status(500).json("Internal server error.");
        return;
    }
};
