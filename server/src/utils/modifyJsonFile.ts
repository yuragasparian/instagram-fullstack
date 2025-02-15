import { TypeUserData } from "index";
import  fs  from 'fs/promises';
import { Post } from "types/posts";

export const modifyJSONFile = async (filePath: string, newData: TypeUserData[]|Post[]) => {
    try {
        const backupPath = `${filePath}.backup`;
        await fs.copyFile(filePath, backupPath);

        await fs.writeFile(filePath, JSON.stringify(newData, null, 2));

    } catch (error) {
        console.error("Error modifying JSON file, restoring backup:", error);
        await fs.copyFile(`${filePath}.backup`, filePath);
        throw error;
    }
};