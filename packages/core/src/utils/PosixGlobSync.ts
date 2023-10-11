import {GlobOptionsWithFileTypesFalse, globSync} from "glob";

export function posixGlobSync(rules: string | string[], options: GlobOptionsWithFileTypesFalse): string[] {
    return globSync([...rules], {
        ...options,
        posix: true,
    });
}
