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
    packages: { [packagePath: string]: PackageJson };
    depthLimit: number;
    dependencyGraph: DependencyGraph;

    pathList: string[];

    constructor(packages: { [packagePath: string]: PackageJson }, depthLimit: number) {
        this.packages = packages;
        this.depthLimit = depthLimit;
        this.pathList = Object.getOwnPropertyNames(packages);
        this.dependencyGraph = new DependencyGraph(this.pathList.map(e => {
            return {
                name: packages[e].name,
                version: packages[e].version,
                path: e,
                depth: 0,
                id: -1
            }
        }));
    }

    //根据package.json数组构建依赖图
    buildDependencyGraph() {

        // 限制深度时， 用bfs限制遍历的深度
        for (let pth of this.pathList) {
            this.packages[pth].depth = 0;
        }
        const packageQueue = new Queue<string>();
        // <''>是项目的路径
        this.packages[''].depth = 1;
        packageQueue.push('');

        while (!packageQueue.isEmpty()) {
            const front = packageQueue.dequeue();
            this.dependencyGraph.setPackageDepth(front, this.packages[front].depth as number);
            // 若有深度限制, 达到最大深度时， 不再向下搜索
            // 没有深度限制时, 由于depthLimit=-1， 所以同样不会触发退出
            if (this.packages[front].depth === this.depthLimit) {
                continue;
            }
            this.iteratePackageDependency(front, (usedPackage, type) => {
                this.dependencyGraph.addDependency(front, usedPackage, type);
                // 未搜索过时， 加入队列
                if (this.packages[usedPackage].depth === 0) {
                    packageQueue.push(usedPackage);
                    this.packages[usedPackage].depth = (this.packages[front].depth as number) + 1;
                }
            })
        }
    }

    // 遍历一个包的所有依赖, 并得到其链接的包的路径;
    // 产生(依赖包路径, 依赖类型)为参数的回调
    // 这是核心算法
    iteratePackageDependency(pth: string, callback: (usedPackage: string, type: DependencyType) => void): void {
        const nodeModulesDirectories: string[] = this.findNodeModulesDirectories(path.posix.join(pth, "node_modules"));
        if (pth === "node_modules/npa-tool") {
            console.log(nodeModulesDirectories)
            console.log(this.packages[path.posix.join("node_modules", "hirestime")]);
        }
        // 该不该遍历其它类型的dependencies呢？
        // 尤其是devDependencies， 一般来说npm包的devDependencies不会被安装， 但项目的devDependencies会被安装
        // 如果为每个包都去匹配devDependencies的话， 可能会出现， 大部分包其实并没有安装devDependencies
        // --但如果你要找， 可能能找到对应的包， 因为项目可能已经安装了对应的包。 幽灵依赖问题

        // 遍历dependencies
        this.iterateDependenciesMap(this.packages[pth].dependencies, (name, version) => {
            const targetPath = this.matchPackage(nodeModulesDirectories, name);

            // dependencies必须匹配成功
            if (targetPath === undefined) {
                throw new Error(`${pth}的依赖${name}: ${version}未找到`);
            }

            // 当版本要求为链接形式时， 可能会产生这个异常
            // 但不影响包的依赖匹配
            if (!satisfies(this.packages[targetPath].version, version)) {
                console.log("版本号不匹配?", pth, "目标版本: ", version, "匹配到的版本: ", this.packages[targetPath].version);
            }
            callback(targetPath, DependencyType.Dependencies)
        });

        // 遍历开发依赖
        // 开发依赖数量庞大， 且除了根目录的不会被安装
        // 根据dev标注， 只会去遍历开发环境的包的开发依赖
        if (this.packages[pth].dev) {
            this.iterateDependenciesMap(this.packages[pth].devDependencies, (name, version) => {
                const targetPath = this.matchPackage(nodeModulesDirectories, name);
                if (targetPath === undefined) {
                    throw new Error(`${pth}的开发依赖${name}: ${version}未找到`);
                }
                callback(targetPath, DependencyType.DevDependencies);
            })
        }

        // 遍历可选依赖
        // 可选依赖一般会安装, 但即使没有安装也没有关系
        this.iterateDependenciesMap(this.packages[pth].optionalDependencies, (name, version) => {
            const targetPath = this.matchPackage(nodeModulesDirectories, name);
            if (targetPath !== undefined) {
                callback(targetPath, DependencyType.OptionalDependencies);
            }
        })
    }

    // 遍历包的一种依赖
    // 产生(包名, 版本)为参数的回调
    iterateDependenciesMap(dependencies :DependenciesMap | undefined, callback: (name: string, version: string) => void): void {
        if (dependencies === undefined) {
            return;
        }
        for (let packageName of Object.getOwnPropertyNames(dependencies)) {
            // 版本号有很多格式， 其中semver只能解析正常的版本号
            // 但还可能会有链接形式
            // 如npm:...., file:..., http://....
            // 详见(https://docs.npmjs.com/cli/v8/configuring-npm/package-json?v=true#dependencies)
            // 对于特殊格式, 实际的依赖可能需要解析才能得到, 如A: npm:B@^1.0.0， 存储的目录以及引用时看似是A包， 但其实真正安装使用的是B包
            // 是否需要去解析？ 目前的做法是， npm链接可以准确的得到包名和版本， 可以解析一下正确， 免得检查报错
            let version = dependencies[packageName];
            if (version.startsWith("npm:")) {
                const sp = version.split('@');
                callback(packageName, sp[1]);
            } else {
                callback(packageName, version);
            }
        }
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

    // 从下到上依次搜索node_modules目录，按照扁平化算法， 第一次存在目标依赖包的目录， 就是依赖包所在的目录
    matchPackage(nodeModulesDirectories: string[], targetPackageName: string): string | undefined {
        const result = nodeModulesDirectories.find(e => {
            return this.packages[path.posix.join(e, targetPackageName)] !== undefined;
        })
        if (result === undefined) {
            return undefined;
        }
        return path.posix.join(result, targetPackageName);
    }

    //
    getGraphData() {
        return {
            nodes: this.dependencyGraph.exportPackages(),
            edges: this.dependencyGraph.exportEdges()
        }
    }
}
