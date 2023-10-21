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

// esm下没办法用require导入json， 退而求其次， 自己写一个同步的导入函数
export function readJsonFile<T>(filePath: string): T {
    const data: string = fs.readFileSync(filePath).toString();
    return JSON.parse(data) as T;
}
