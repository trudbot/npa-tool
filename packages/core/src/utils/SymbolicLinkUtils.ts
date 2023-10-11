import fs from "fs";
import path from "path";
import {toPosixRelativePath} from "./PathUitls";

function readSymbolicLinkValue(pth: string): string {
    return fs.readlinkSync(pth);
}

export function readPosixSymbolLinkRelativeValue(pth: string, root: string): string {
    return toPosixRelativePath(path.relative(root, readSymbolicLinkValue(pth)));
}

export function isSymbolicLink(pth: string): boolean {
    return fs.lstatSync(pth).isSymbolicLink();
}
