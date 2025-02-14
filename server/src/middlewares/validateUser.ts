import { Request, Response, NextFunction } from "express";
import fs from "fs/promises";
import { TypeUserData } from "../index";

export const validateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password } = req.body;

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
        const data_str = await fs.readFile("src/db/users.json", "utf8");
        const data: TypeUserData[] = JSON.parse(data_str);
        const userExists = data.some((user) => user.username === username);
        if (userExists) {
            res.status(401).json("Username is already taken.");
            return;
        }
        next();
    } catch (error) {
        console.error("Error reading database:", error);
        res.status(500).json("Internal server error.");
        return;
    }
};
