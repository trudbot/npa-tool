import {PackageInfo} from "./PackageJson";
import {DependencyType} from "../enums/DependencyType";

interface Edge {
    from: number;
    to: number;
    info: DependencyType;
}

interface GraphData {
    nodes: PackageInfo[],
    edges: Edge[],
    licenses: {
        [name: string]: number
    }
}

export {GraphData}
