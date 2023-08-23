import {PackageInfo} from "./PackageJson";
import {DependencyType} from "./DependencyType";

interface Edge {
    from: number;
    to: number;
    info: DependencyType;
}
interface GraphData {
    nodes: PackageInfo[],
    edges: Edge[]
}

export type {Edge, GraphData}
