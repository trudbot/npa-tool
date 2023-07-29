import {Graph} from "./Graph";
import {PackageJson} from "./PackageJson";
import {DependencyType} from "./DependencyType";

class DependencyGraph {
    graph: Graph<PackageJson, DependencyType>;
    index: Map<PackageJson, number>;

    packages: Array<PackageJson>;
    availableIndex: number = 0;

    constructor(N: number) {
        this.graph = new Graph<PackageJson, DependencyType>(N);
        this.index = new Map<PackageJson, number>();
        this.packages = new Array(N);
    }

    private addNewPackage(p: PackageJson): boolean {
        if (this.availableIndex < this.packages.length) {
            this.packages[this.availableIndex] = p;
            this.index.set(p, this.availableIndex);
            this.availableIndex ++;
            return true;
        }
        return false;
    }

    private checkPackage(p: PackageJson): boolean {
        if (!this.index.has(p)) {
            return this.addNewPackage(p);
        }
        return true;
    }

    addDependency(a: PackageJson, b: PackageJson, type: DependencyType) {
        if (!this.checkPackage(a) || !this.checkPackage(b)) {
            throw new Error("依赖图初始化的空间不足");
        }
        this.graph.addEdge(this.index.get(a) as number, this.index.get(b) as number, type);
    }

    exportDependencies() {
        return {
            edges: this.graph.exportEdges(0, this.availableIndex - 1),
            nodes: this.packages.slice(0, this.availableIndex - 1)
        }
    }
}
