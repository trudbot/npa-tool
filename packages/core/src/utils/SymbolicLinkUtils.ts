import fs from "fs";
import path from "path";
import {toPosixRelativePath, isAbsolute, nativePathJoin, nativeDirname} from "./PathUitls";

function readSymbolicLinkValue(pth: string): string {
    return fs.readlinkSync(pth);
}

export function readPosixSymbolLinkRelativeValue(pth: string, root: string): string {
    const realPath = readSymbolicLinkValue(pth);
    const realAbsolutePath = isAbsolute(realPath) ? realPath : nativePathJoin(nativeDirname(pth), realPath);
    return toPosixRelativePath(path.relative(root, realAbsolutePath));
}

export function isSymbolicLink(pth: string): boolean {
    return fs.lstatSync(pth).isSymbolicLink();
}
