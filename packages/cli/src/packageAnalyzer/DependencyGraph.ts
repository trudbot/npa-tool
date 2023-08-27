import {Graph} from "./Graph";
import {DependencyType} from "../types/DependencyType"
import {PackageInfo} from "../types/PackageJson";
import {GraphData} from "../types/GraphData";
import Fuse from "fuse.js";

// 这个类主要做的是索引维护， 即包->索引的对应关系， 建图时的工具类
// 这里使用包的唯一标识: 路径来做key
class DependencyGraph {
    graph: Graph<DependencyType>;
    index: Map<string, number>;

    packages: Array<PackageInfo>;


    constructor(packages: Array<PackageInfo>) {
        this.packages = packages;
        this.graph = new Graph<DependencyType>(packages.length);
        this.index = new Map<string, number>();
        for (let i = 0; i < packages.length; i++) {
            this.index.set(packages[i].path, i);
            packages[i].id = i;
        }
    }

    addDependency(pth1: string, pth2: string, type: DependencyType) {
        if (this.index.has(pth1) && this.index.has(pth2)) {
            this.graph.addEdge(this.index.get(pth1) as number, this.index.get(pth2) as number, type);
        } else {
            throw new Error("传入的路径错误！ by DependencyGraph > addDependency");
        }
    }

    setPackageDepth(pth: string, depth: number): void {
        if (this.index.has(pth)) {
            this.packages[this.index.get(pth) as number].depth = depth;
        }
    }

    exportEdges() {
        return this.graph.exportEdges()
    }

    exportPackages() {
        return this.packages.filter((e) => e.depth !== 0);
    }

    exportToJson() {
        const res: JsonData = {};
        const edges = this.graph.edges;
        for (let i = 0; i < this.packages.length; i++) {
            res[this.packages[i].path] = {
                name: this.packages[i].name,
                version: this.packages[i].version,
                dependencies: {}
            }
            for (let edge of edges[i]) {
                res[this.packages[i].path].dependencies[this.packages[edge.to].name] = this.packages[edge.to].path;
            }
        }
        return res;
    }

    // 单独查看某个包的依赖
    getSpecifiedPackageDependencies(id: number, depthLimit: number): GraphData {
        const {nodes, edges} = this.graph.subGraph(id, depthLimit);
        return {
            nodes: nodes.map((e) => {
                const info: PackageInfo = {...this.packages[e.id]};
                info.depth = e.depth;
                return info;
            }),
            edges: edges,
            licenses: {}
        }
    }

    // 获得某个包的直接依赖
    getDirectDependency(id: number) {
        return {
            list: this.graph.edges[id].map(e => {
                return this.packages[e.to];
            })
        }
    }

    // why installed it
    whyInstalledIt(id: number): GraphData {
        const {nodes, edges} = this.graph.findPredecessors(id);
        return {
            nodes: nodes.map((e) => {
                const info: PackageInfo = {...this.packages[e.id]};
                info.depth = e.depth;
                return info;
            }),
            edges: edges,
            licenses: {}
        }
    }

    // 包名查询
    queryPackage(searchPattern: string) {
        const fuseOptions = {
            keys: [
                'name',
                'version'
            ]
        }
        const fuse = new Fuse(this.packages, fuseOptions);
        return {
            data: fuse.search(searchPattern)
        }
    }
}

export {DependencyGraph}
