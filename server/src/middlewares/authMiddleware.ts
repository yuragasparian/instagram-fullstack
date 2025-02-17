import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors, JwtPayload } from "jsonwebtoken";
import { SECRET_KEY } from './../routes/routes';
import { TypeUserData } from '../types/types';
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
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
            req.body.user=user
            next();
        }
    );
}

export default authMiddleware