import path from "path";
export function readPackage(root: string) {
    try {
        const p = require(path.join(root, 'package.json'));
    } catch (err) {
        console.log("报错内容:")
        console.log((err as Error).message);
    }
}
