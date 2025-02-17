"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const routes_1 = require("./../routes/routes");
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    ;
    jsonwebtoken_1.default.verify(token, routes_1.SECRET_KEY, (err, user) => {
        if (err) {
            res.status(403).json("Invalid token");
            return;
        }
        ;
        req.body.user = user;
        next();
    });
};
exports.default = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map