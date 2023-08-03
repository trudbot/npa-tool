type DependenciesMap = { [packageName: string]: string };

// package.json的抽象接口
interface PackageJson {
    name: string;
    version: string;
    description?: string;
    keywords?: string[];
    author?: string;
    license?: string;
    repository?: {
        type: string;
        url: string;
    };
    dependencies?: DependenciesMap;
    devDependencies?: DependenciesMap;
    peerDependencies?: DependenciesMap;
    optionalDependencies?: DependenciesMap;
    bundledDependencies?: string[];

    depth?: number;

    NOTFOUND?: boolean;

    path?: string;
}

export {PackageJson, DependenciesMap}

