import {DependencyType} from "../enums/DependencyType";

type DependenciesMap = { [packageName: string]: string };
// package.json的抽象接口
interface PackageJson {
    name: string;
    version: string;
    workspaces?: string[];
    license?: string | object[];
    [DependencyType.Dependencies]?: DependenciesMap;
    [DependencyType.DevDependencies]?: DependenciesMap;
    [DependencyType.PeerDependencies]: DependenciesMap;
    [DependencyType.OptionalDependencies]?: DependenciesMap;
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

export const ROOT: string = '';

export type PackagesSet<T> = {[path: string]: T};

export {PackageJson, DependenciesMap, PackageInfo}

