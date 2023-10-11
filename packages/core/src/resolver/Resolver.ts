import {PackageJson, PackagesSet} from "../types/PackageJson";
import {DependencyGraph} from "../dependency-graph/DependencyGraph";

export abstract class DependencyResolver<T> {
    packageSet: PackagesSet<T>;
    depthLimit: number;
    dependencyGraph: DependencyGraph;

    protected constructor(packageSet: PackagesSet<T>, depthLimit: number) {
        this.packageSet = packageSet;
        this.depthLimit = depthLimit;
        this.dependencyGraph = this.initDependencyGraph();
    }

    abstract initDependencyGraph(): DependencyGraph;

    abstract resolveDependencies(): DependencyGraph;

    abstract getPackageSetOfPackageJson(): PackagesSet<PackageJson>;
}
