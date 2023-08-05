import {DependenciesMap, PackageJson} from "../classes/PackageJson";
import {DependencyGraph} from "./DependencyGraph";
import {DependencyType} from "../classes/DependencyType";
import {satisfies} from "semver";
import path from "path";
import {Queue} from "@datastructures-js/queue";


// 问题的核心在于， 对于a包， 它依赖了b包， 你该怎么找到a依赖的是哪个b包？
// 原来的算法中， 采用版本匹配的思路， 遍历所有同名的包， 找到能和a要求的版本号匹配的b包
// 但很显然的， 会出现<有多个符合版本要求的b包>， 甚至有<同版本的b包> ----- 前功尽弃(
// npm扁平化的过程中改变了依赖树的结构， 而我们又不能直接得到链接关系
// 留给我们的， 只有路径这一个关键信息
// 包的名字和版本, 就算结合起来， 都不能唯一的标识一个包， 但路径可以
// 找出各个包之间的链接关系， 可以说是一个"逆扁平化"的过程
export class PackageAnalyzer {
    private readonly packages: { [packagePath: string]: PackageJson };
    private readonly depthLimit: number;
    private readonly dependencyGraph: DependencyGraph;

    private readonly pathList: string[];

    constructor(packages: { [packagePath: string]: PackageJson }, depthLimit: number) {
        this.packages = packages;
        this.depthLimit = depthLimit;
        this.pathList = Object.getOwnPropertyNames(packages);
        this.dependencyGraph = new DependencyGraph(this.pathList.map(e => {
            return {
                name: packages[e].name,
                version: packages[e].version,
                path: e
            }
        }));
    }

    //对外暴露的接口， 根据package.json数组构建依赖图
    buildDependencyGraph() {
        // 若无限制， 直接遍历所有包的依赖， 建立图
        if (this.depthLimit === -1) {
            for (let pth of this.pathList) {
                this.iteratePackageDependency(pth, usedPackageList => {
                    for (let usedPackage of usedPackageList) {
                        this.dependencyGraph.addDependency(pth, usedPackage, DependencyType.Dependencies);
                    }
                });
            }
        } else {
            // 限制深度时， 用bfs限制遍历的深度
            for (let pth of this.pathList) {
                this.packages[pth].depth = 0;
            }
            const packageQueue = new Queue<string>();
            this.packages[''].depth = 1;
            packageQueue.push('');

            while (!packageQueue.isEmpty()) {
                const front = packageQueue.dequeue();
                // 达到最大深度时， 不再向下搜索
                if (this.packages[front].depth === this.depthLimit) {
                    continue;
                }
                this.iteratePackageDependency(front, usedPackageList => {
                    for (let usedPackage of usedPackageList) {
                        // 其实是不太可能出现循环依赖的， 出现了就说明包依赖有大问题
                        if (this.packages[usedPackage].depth !== 0) {
                            console.log("出现循环依赖");
                            continue
                        }
                        this.packages[usedPackage].depth = (this.packages[front].depth as number) + 1;
                        this.dependencyGraph.addDependency(front, usedPackage, DependencyType.Dependencies);
                        packageQueue.push(usedPackage);
                    }
                })
            }
        }
        return this.dependencyGraph;
    }

    // 遍历一个包的所有依赖, 并得到其链接的包的路径
    // 这是核心算法
    iteratePackageDependency(pth: string, callback: (usedPackageList: string[]) => void) {
        if (this.packages[pth].dependencies === undefined) return;
        const usedPackageList: string[] = [];
        const nodeModulesDirectories: string[] = this.findNodeModulesDirectories(path.posix.join(pth, "node_modules"));

        // 这里只遍历了dependencies
        // 该不该遍历其它类型的dependencies呢？
        // 尤其是devDependencies， 一般来说npm包的devDependencies不会被安装， 但项目的devDependencies会被安装
        // 如果为每个包都去匹配devDependencies的话， 可能会出现， 大部分包其实并没有安装devDependencies
        // --但如果你要找， 可能能找到对应的包， 因为根目录安装了一些。 产生了幽灵依赖问题
        for (let packageName of Object.getOwnPropertyNames(this.packages[pth].dependencies)) {
            // targetPath是找到的对应包的路径
            const targetPath = this.matchPackage(nodeModulesDirectories, packageName);

            // 版本号处理
            // 版本号有很多格式， 其中semver只能解析正常的版本号
            // 可能有npm:...., file:..., http://....
            // 详见(https://docs.npmjs.com/cli/v8/configuring-npm/package-json?v=true#dependencies)
            const versionRequire = (this.packages[pth].dependencies as DependenciesMap)[packageName];

            if (!satisfies(this.packages[targetPath].version, versionRequire)) {
                //不正常时， 需要报错吗？ 应该不需要做任何处理
                // console.log("版本号不匹配， 或版本号异常！");
                // console.log("依赖关系", `${pth} -> ${targetPath}`)
                // console.log("versionRequire: ", versionRequire);
                // console.log("targetVersion: ", this.packages[targetPath].version);
            }
            usedPackageList.push(targetPath);
        }
        callback(usedPackageList);
    }

    // 找出一个目录所有以node_modules结尾的父目录
    findNodeModulesDirectories(pth: string): string[] {
        const result: string[] = [];
        do {
            if (path.posix.basename(pth) === "node_modules") {
                result.push(pth);
            }
            if (path.posix.dirname(pth) === pth) {
                break;
            }
            pth = path.posix.dirname(pth);
        } while (true)
        return result;
    }

    // 找到离包目录最近的、存在目标依赖包的node_modules目录， 按照扁平化算法， 依赖包必定是这个
    matchPackage(nodeModulesDirectories: string[], targetPackageName: string): string {
        // console.log(nodeModulesDirectories);
        // console.log(path.join(nodeModulesDirectories[0], targetPackageName))
        // console.log(this.packages[path.join(nodeModulesDirectories[0], targetPackageName)] === undefined);
        const result = nodeModulesDirectories.find(e => {
            return this.packages[path.posix.join(e, targetPackageName)] !== undefined;
        })
        if (result === undefined) {
            throw new Error(`找不到依赖: ${nodeModulesDirectories} ${targetPackageName}`);
        }
        return path.posix.join(result, targetPackageName);
    }

}
