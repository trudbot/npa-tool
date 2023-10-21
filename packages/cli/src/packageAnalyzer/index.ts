import {DependencyGraph, GraphData, PackageJson, PackagesSet, ResolverFactory} from "npa-core";


export function AnalyzerFactory(root: string, depthLimit: number) {
    const factory = new ResolverFactory();
    const resolver = factory.getDependencyGraph(root, depthLimit);
    const dependencyGraph = resolver.resolveDependencies();
    const packages = resolver.getPackageSetOfPackageJson();
    return new PackageAnalyzer(dependencyGraph, packages);
}

export class PackageAnalyzer {
    dependencyGraph: DependencyGraph;
    packages: PackagesSet<PackageJson>;


    constructor(dependencyGraph: DependencyGraph, packages: PackagesSet<PackageJson>) {
        this.dependencyGraph = dependencyGraph;
        this.packages = packages;
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
