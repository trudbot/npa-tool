import {ResolverFactory} from "npa-core";
import {DependencyGraph} from "npa-core/lib/src/dependency-graph/DependencyGraph";
import {PackageJson, PackagesSet} from "npa-core/lib/src/types/PackageJson";
import {GraphData} from "npa-core/lib/src/types/GraphData";

export class PackageAnalyzer {
    dependencyGraph: DependencyGraph;
    packages: PackagesSet<PackageJson>

    constructor(root: string, depthLimit: number) {
        const factory = new ResolverFactory();
        const resolver = factory.getDependencyGraph(root, depthLimit);
        this.dependencyGraph = resolver.resolveDependencies();
        this.packages = resolver.getPackageSetOfPackageJson();
    }

    //
    getGraphData() {
        return {
            nodes: this.dependencyGraph.exportPackages(),
            edges: this.dependencyGraph.exportEdges()
        }
    }

    // 对导出的图的数据做进一步的统计分析
    graphStatistics(data: GraphData): GraphData {
        const licenseNum = new Map<string, number>();

        data.nodes.forEach((e) => {
            const packageJson = this.packages[e.path];
            if (packageJson.license && typeof packageJson.license === 'string') {
                if (licenseNum.get(packageJson.license) === undefined) {
                    licenseNum.set(packageJson.license, 1);
                } else {
                    licenseNum.set(packageJson.license, licenseNum.get(packageJson.license) as number + 1);
                }
            }
        })
        data.licenses = Object.fromEntries(licenseNum);
        return data;
    }

    getPackageDependencies(id: number, depth: number) {
        return this.graphStatistics(this.dependencyGraph.getSpecifiedPackageDependencies(id, depth));
    }

    //
    whyInstalledIt(id: number) {
        return this.graphStatistics(this.dependencyGraph.whyInstalledIt(id));
    }

}
