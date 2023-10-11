import fs from "fs";

export function isFileExistsInDirectory(directoryPath: string, fileName: string): boolean {
    const filePath = `${directoryPath}/${fileName}`;

    try {
        fs.accessSync(filePath, fs.constants.F_OK);
        return true;
    } catch (err) {
        return false;
    }
}
