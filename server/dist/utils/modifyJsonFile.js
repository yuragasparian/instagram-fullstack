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
exports.modifyJSONFile = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const modifyJSONFile = (filePath, newData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const backupPath = `${filePath}.backup`;
        yield promises_1.default.copyFile(filePath, backupPath);
        yield promises_1.default.writeFile(filePath, JSON.stringify(newData, null, 2));
    }
    catch (error) {
        console.error("Error modifying JSON file, restoring backup:", error);
        yield promises_1.default.copyFile(`${filePath}.backup`, filePath);
        throw error;
    }
});
exports.modifyJSONFile = modifyJSONFile;
//# sourceMappingURL=modifyJsonFile.js.map