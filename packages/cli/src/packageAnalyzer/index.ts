import {DependenciesMap, PackageJson} from "../classes/PackageJson";
import {DependencyGraph} from "./DependencyGraph";
import {DependencyType} from "../classes/DependencyType";
import {satisfies} from "semver";
import assert from "assert";

export class PackageAnalyzer {
    private readonly packages: PackageJson[];
    private readonly depthLimit: number;

    private packageVersionsMap: Map<string, PackageJson[]>;
    private readonly dependencyGraph: DependencyGraph;

    constructor(packages: PackageJson[], depthLimit: number) {
        this.packages = packages;
        this.depthLimit = depthLimit;
        this.packageVersionsMap = new Map<string, PackageJson[]>();
        this.dependencyGraph = new DependencyGraph(10000);
    }

    private addDependency(packageJson: PackageJson, dependencies: DependenciesMap, type: DependencyType) {
        for (const packageName in dependencies) {
            if (this.packageVersionsMap.has(packageName)) {
                const matched = (this.packageVersionsMap.get(packageName) as PackageJson[]).filter(v => {
                    return satisfies(v.version, dependencies[packageName]);
                });

                // 没有匹配的包？ 一般不会出现这个情况
                if (matched.length === 0) {
                    throw new Error(`没有满足${packageName}包的版本满足${packageJson.name}的依赖要求(${dependencies[packageName]})`);
                }
                // 有多个满足版本的包出现， 到底会不会出现这个情况？该怎么处理？有待商榷
                if (matched.length > 1) {
                    console.log(matched)
                    throw new Error(`有多个${packageName}包的版本满足${packageJson.name}的依赖要求(${dependencies[packageName]})`);
                }
                this.dependencyGraph.addDependency(packageJson, matched[0], type);

                // 一方面避免死循环， 一方面递增depth
                if (matched[0].depth === 0) {
                    matched[0].depth = (packageJson.depth as number) + 1;
                    this.dfsPackages(matched[0]);
                }
            } else {
                const tmpPackage: PackageJson = {
                    name: packageName,
                    version: dependencies[packageName],
                    NOTFOUND: true
                }
                this.dependencyGraph.addDependency(packageJson, tmpPackage, type);
            }
        }
    }

    private dfsPackages(packageJson: PackageJson) {
        if (packageJson.depth === this.depthLimit) return;

        if (packageJson.dependencies !== undefined) {
            this.addDependency(packageJson, packageJson.dependencies, DependencyType.Dependencies);
        }

        // 是否要统计dependencies之外的包？ 实际上devDependencies一般不会被安装， 但数量庞大

        // if (packageJson.devDependencies !== undefined) {
        //     this.addDependency(packageJson, packageJson.devDependencies, DependencyType.DevDependencies);
        // }
        //
        // if (packageJson.peerDependencies !== undefined) {
        //     this.addDependency(packageJson, packageJson.peerDependencies, DependencyType.PeerDependencies);
        // }
        //
        // if (packageJson.optionalDependencies !== undefined) {
        //     this.addDependency(packageJson, packageJson.optionalDependencies, DependencyType.OptionalDependencies);
        // }
    }

    //对外暴露的接口， 根据package.json数组构建依赖图
    buildDependencyGraph() {
        for (let packageJson of this.packages) {
            packageJson.depth = 0;
            if (!this.packageVersionsMap.has(packageJson.name)) {
                this.packageVersionsMap.set(packageJson.name, [packageJson]);
            } else {
                (this.packageVersionsMap.get(packageJson.name) as PackageJson[]).push(packageJson);
            }
        }

        (this.packages)[0].depth = 1;

        this.dfsPackages((this.packages)[0]);

        return this.dependencyGraph;
    }
}
