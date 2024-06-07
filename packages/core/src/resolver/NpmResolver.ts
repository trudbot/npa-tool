import {PackageJson, PackagesSet, ROOT} from "../types/PackageJson";
import {findSpecifiedDirectories, posixPathJoin} from "../utils/PathUitls";
import semver from 'semver'
import {DependencyResolver} from "./Resolver";
import {DEFAULT_DEPTH, DependencyGraph, TEMP_ID} from "../dependency-graph/DependencyGraph";
import {Queue} from "@datastructures-js/queue";
import {DependencyType} from "../enums/DependencyType";
import {iterateDependenciesMap} from "../utils/packageJsonUtils";


export class NpmResolver extends DependencyResolver<PackageJson> {
    private readonly pathList: string[];

    constructor(packageSet: PackagesSet<PackageJson>, depthLimit: number) {
        super(packageSet, depthLimit);
        this.pathList = Object.getOwnPropertyNames(packageSet);
        // console.log(this.pathList)
    }

    initDependencyGraph() {
        return new DependencyGraph(Object.getOwnPropertyNames(this.packageSet).map(pth => {
            return {
                name: this.packageSet[pth].name,
                version: this.packageSet[pth].version,
                depth: DEFAULT_DEPTH,
                id: TEMP_ID,
                path: pth
            }
        }));
    }

    resolveDependencies(): DependencyGraph {
        const NO_ITE = 0;
        for (let pkg of this.pathList) {
            this.packageSet[pkg].depth = NO_ITE;
        }
        const packageQueue = new Queue<string>();
        packageQueue.push(ROOT);
        this.packageSet[ROOT].depth = 1;

        while (!packageQueue.isEmpty()) {
            const front = packageQueue.dequeue();
            this.dependencyGraph.setPackageDepth(front, this.packageSet[front].depth as number);
            // 若有深度限制, 达到最大深度时， 不再向下搜索
            // 没有深度限制时, 由于depthLimit=-1， 所以同样不会触发退出
            if (this.packageSet[front].depth === this.depthLimit) {
                continue;
            }
            // console.log('front: ', front);
            this.iteratePackageDependency(front, (depend: string, type: DependencyType) => {
                // console.log('\t', depend)
                this.dependencyGraph.addDependency(front, depend, type);

                // 未搜索过时， 加入队列
                if (this.packageSet[depend].depth === NO_ITE) {
                    packageQueue.push(depend);
                    this.packageSet[depend].depth = (this.packageSet[front].depth as number) + 1;
                }
            })
        }

        return this.dependencyGraph;
    }

    // 遍历一个包的所有依赖, 并得到其链接的包的路径;
    // 产生(依赖包路径, 依赖类型)为参数的回调
    // 这是核心算法
    iteratePackageDependency(pth: string, callback: (usedPackage: string, type: DependencyType) => void): void {
        // 该不该遍历其它类型的dependencies呢？
        // 尤其是devDependencies， 一般来说npm包的devDependencies不会被安装， 但项目的devDependencies会被安装
        // 如果为每个包都去匹配devDependencies的话， 可能会出现， 大部分包其实并没有安装devDependencies
        // --但如果你要找， 可能能找到对应的包， 因为项目可能已经安装了对应的包。 幽灵依赖问题

        // 遍历dependencies
        iterateDependenciesMap(this.packageSet[pth].dependencies, (name, version) => {
            const targetPath = this.matchDependency(pth, name, version);

            // dependencies必须匹配成功
            if (targetPath === undefined) {
                console.error(`${pth}的依赖${name}: ${version}未找到`);
            }

            // 当版本要求为链接形式时， 可能会产生这个异常
            // 但不影响包的依赖匹配
            if (!semver.satisfies(this.packageSet[targetPath].version, version)) {
                console.warn("版本号不匹配?", "src:", pth, "target:", targetPath, "目标版本: ", version, "匹配到的版本: ", this.packageSet[targetPath].version);
            }
            callback(targetPath, DependencyType.Dependencies)
        });

        // 遍历开发依赖
        // 开发依赖数量庞大， 且除了根目录的不会被安装
        // 根据dev标注， 只会去遍历开发环境的包的开发依赖
        if (this.packageSet[pth].dev) {
            iterateDependenciesMap(this.packageSet[pth].devDependencies, (name, version) => {
                const targetPath = this.matchDependency(pth, name, version);
                if (targetPath === undefined) {
                    console.error(`${pth}的开发依赖${name}: ${version}未找到`);
                }
                callback(targetPath, DependencyType.DevDependencies);
            })
        }

        // 遍历可选依赖
        // 可选依赖一般会安装, 但即使没有安装也没有关系
        iterateDependenciesMap(this.packageSet[pth].optionalDependencies, (name, version) => {
            const targetPath = this.matchDependency(pth, name, version);
            if (targetPath !== undefined) {
                callback(targetPath, DependencyType.OptionalDependencies);
            }
        })

        // 遍历同等依赖
        iterateDependenciesMap(this.packageSet[pth].peerDependencies, (name, version) => {
            const targetPath = this.matchDependency(pth, name, version);

            // peerDependencies必须匹配成功
            if (targetPath === undefined) {
                console.error(`${pth}的peer依赖${name}: ${version}未找到`);
            }
        })
    }


    matchDependency(pth: string, target: string, version: string): string {
        let result: string | undefined = undefined;
        const option: string[] = [];
        const possibleDir = findSpecifiedDirectories(pth, 'node_modules').concat([posixPathJoin(pth, 'node_modules')]);
        possibleDir.forEach(dir => {
            const targetPath = posixPathJoin(dir, target);
            if (this.packageSet[targetPath] !== undefined) {
                if (semver.satisfies(this.packageSet[targetPath].version, version) && result === undefined) {
                    result = targetPath;
                }
                option.push(targetPath);
            }
        })
        if (result !== undefined) {
            return result;
        }
        if (option.length === 1) {
            return option[0];
        }
        console.error(`No dependencies matched， src: ${pth}, target: ${target + '@' + version}`);
    }

    getPackageSetOfPackageJson(): PackagesSet<PackageJson> {
        return this.packageSet;
    }
}
