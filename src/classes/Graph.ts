import assert from "assert";

class Edge<T> {
    to: number;
    info: T;

    constructor(to: number, info: T) {
        this.to = to;
        this.info = info;
    }
}

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

    exportEdges(start: number, end: number) {
        assert(start >= 0 && start < this.edges.length);
        assert(end >= start && end < this.edges.length);
        return this.edges.slice(start, end);
    }
}

export {Graph}
