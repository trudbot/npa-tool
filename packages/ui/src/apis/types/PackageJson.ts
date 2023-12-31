type DependenciesMap = { [packageName: string]: string };
// package.json的抽象接口
interface PackageJson {
    name: string;
    version: string;
    description?: string;
    homepage?: string;
    workspaces?: string[];
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

interface PackageData {
    path: string,
    packageJson: PackageJson
}

export type {PackageJson, DependenciesMap, PackageInfo, PackageData}

