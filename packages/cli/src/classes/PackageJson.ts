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
    depth?: number;
    dev?: boolean;
}

interface PackageInfo {
    name: string;
    version: string;
    path: string;
    depth: number;
    id: number;
}

export {PackageJson, DependenciesMap, PackageInfo}

