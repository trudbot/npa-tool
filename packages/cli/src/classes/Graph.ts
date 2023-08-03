import assert from "assert";

class Edge<T> {
    to: number;
    info: T;

    constructor(to: number, info: T) {
        this.to = to;
        this.info = info;
    }
}

// Graph的模板类， 维护边集
class Graph<N, E> {
    edges: Array<Array<Edge<E>>>;
    data: Array<N>;

    constructor(N: number) {
        this.edges = Array.from({length: N}, () => Array.from({length: 0}));
        this.data = Array.from({length: N});
    }

    addEdge(from: number, to: number, info: E) {
        this.edges[from].push(new Edge<E>(to, info));
    }

    // 这一层导出边集以及 索引->包的关系
    exportEdges(start: number, end: number) {
        assert(start >= 0 && start < this.edges.length);
        assert(end >= start && end < this.edges.length);
        return this.edges.slice(start, end);
    }
}

export {Graph}
