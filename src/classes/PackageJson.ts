export interface PackageJson {
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
    dependencies?: { [packageName: string]: string };
    devDependencies?: { [packageName: string]: string };
    peerDependencies?: { [packageName: string]: string };
    optionalDependencies?: { [packageName: string]: string };
    bundledDependencies?: string[];
}

