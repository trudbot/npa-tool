type DependenciesMap = { [packageName: string]: string };
// package.json的抽象接口
interface PackageJson {
    name: string;
    version: string;
    workspaces: string[];
    dependencies?: DependenciesMap;
    devDependencies?: DependenciesMap;
    peerDependencies?: DependenciesMap;
    optionalDependencies?: DependenciesMap;
    bundledDependencies?: string[];
    depth?: number
}

interface PackageInfo {
    name: string,
    version: string,
    path: string;
}

export {PackageJson, DependenciesMap, PackageInfo}

