import path from "path";

export function posixBasename(pth: string): string {
    return path.posix.basename(pth);
}

export function nativeBasename(pth: string): string {
    return path.basename(pth);
}

export function posixDirname(pth: string): string {
    return path.posix.dirname(pth);
}

export function nativeDirname(pth: string): string {
    return path.dirname(pth);
}

export function posixPathJoin(...pth: string[]) {
    return path.posix.join(...pth);
}

export function nativePathJoin(...pth: string[]) {
    return path.join(...pth);
}

export function posixRelative(root: string, pth: string) {
    return path.posix.relative(root, pth);
}

export function toPosixRelativePath(pth: string) {
    return pth.replace(/\\/g, "\/");
}

export function splitPosixPath(pth: string) {
    return pth.split(path.posix.sep);
}

export function findSpecifiedDirectories(pth: string, target: string): string[] {
    const dirs = splitPosixPath(pth);
    const res: string[] = []
    let parent = ''
    dirs.forEach(dir => {
        parent = posixPathJoin(parent, dir);
        if (dir === target) {
            res.push(parent);
        }
    })
    return res;
}

export function isAbsolute(pth: string) {
    return path.isAbsolute(pth) || path.posix.isAbsolute(pth);
}
