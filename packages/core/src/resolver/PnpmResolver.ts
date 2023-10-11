import {DependencyResolver} from "./Resolver";
import {PackageJson, PackagesSet, ROOT} from "../types/PackageJson";
import {PnpmPackageSourceData} from "../loader/loadPnpmModules";
import {DEFAULT_DEPTH, DependencyGraph, TEMP_ID} from "../dependency-graph/DependencyGraph";
import {Queue} from "@datastructures-js/queue";
import {DependencyType} from "../enums/DependencyType";
import {getDependencyMap} from "../utils/packageJsonUtils";

export class PnpmResolver extends DependencyResolver<PnpmPackageSourceData> {
    constructor(props: PackagesSet<PnpmPackageSourceData>, depthLimit: number) {
        super(props, depthLimit);
    }

    initDependencyGraph(): DependencyGraph {
        return new DependencyGraph(Object.getOwnPropertyNames(this.packageSet).map(pth => {
            return {
                name: this.packageSet[pth].packageJson.name,
                version: this.packageSet[pth].packageJson.version,
                depth: DEFAULT_DEPTH,
                id: TEMP_ID,
                path: pth
            }
        }))
    }

    resolveDependencies(): DependencyGraph {
        const NO_ITE = 0;
        Object.getOwnPropertyNames(this.packageSet).forEach(pkg => {
            this.packageSet[pkg].packageJson.depth = NO_ITE;
        })
        const packageQueue = new Queue<string>();
        packageQueue.push(ROOT);
        this.packageSet[ROOT].packageJson.depth = 1;

        while (!packageQueue.isEmpty()) {
            const front = packageQueue.dequeue();
            this.dependencyGraph.setPackageDepth(front, this.packageSet[front].packageJson.depth as number);
            // 若有深度限制, 达到最大深度时， 不再向下搜索
            // 没有深度限制时, 由于depthLimit=-1， 所以同样不会触发退出
            if (this.packageSet[front].packageJson.depth === this.depthLimit) {
                continue;
            }
            // pnpm的依赖可以直接读文件链接获得， 但缺点是无法确定依赖类型
            // 因此将依赖和package.json中的依赖进行匹配，以此确定依赖类型
            const dType = getDependencyMap(this.packageSet[front].packageJson);
            this.packageSet[front].allDependencies.forEach(data => {
                if (!dType.has(data.pkgName)) {
                    throw new Error("Dependency not matched in packageJSON");
                }
                this.dependencyGraph.addDependency(front, data.pth, (dType.get(data.pkgName) as DependencyType));
                if (this.packageSet[data.pth].packageJson.depth === NO_ITE) {
                    packageQueue.push(data.pth);
                    this.packageSet[data.pth].packageJson.depth = (this.packageSet[front].packageJson.depth as number) + 1;
                }
            })
        }
        return this.dependencyGraph;
    }

    getPackageSetOfPackageJson(): PackagesSet<PackageJson> {
        const res: PackagesSet<PackageJson> = {};
        Object.getOwnPropertyNames(this.packageSet).forEach(pth => {
            res[pth] = this.packageSet[pth].packageJson;
        })
        return res;
    }
}
