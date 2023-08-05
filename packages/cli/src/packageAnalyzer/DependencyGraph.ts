import {Graph} from "../classes/Graph";
import {PackageInfo} from "../classes/PackageJson";
import {DependencyType} from "../classes/DependencyType";


// 这个类主要做的是索引维护， 即包->索引的对应关系， 建图时的工具类
// 这里使用包的唯一标识: 路径来做key
class DependencyGraph {
    graph: Graph<DependencyType>;
    index: Map<string, number>;

    packages: Array<PackageInfo>;
    availableIndex: number = 0;


    constructor(packages: Array<PackageInfo>) {
        this.packages = packages;
        this.graph = new Graph<DependencyType>(packages.length);
        this.index = new Map<string, number>();
        for (let i = 0; i < packages.length; i ++) {
            this.index.set(packages[i].path, i);
        }
    }

    addDependency(pth1: string, pth2: string, type: DependencyType) {
        if (this.index.has(pth1) && this.index.has(pth2)) {
            this.graph.addEdge(this.index.get(pth1) as number, this.index.get(pth2) as number, type);
        } else {
            throw new Error("传入的路径错误！ by DependencyGraph > addDependency");
        }
    }

    export() {
        const edges = this.graph.exportEdges();
        const set = new Set<number>();
        const nodes = [];
        for (let e of edges) {
            set.add(e.to).add(e.from);
        }
        for (let i of set) {
            nodes.push({
                id: i,
                path: this.packages[i].path
            })
        }
        return {
            edges: edges,
            nodes: nodes
        }
    }

    exportPackages() {
        return {
            data: this.packages
        }
    }
}

export {DependencyGraph}
