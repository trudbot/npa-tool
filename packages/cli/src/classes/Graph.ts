
interface Edge<T> {
    from: number;
    to: number;
    info: T;
}

// Graph的模板类， 维护边集
class Graph<E> {
    edges: Array<Array<Edge<E>>>;

    constructor(N: number) {
        this.edges = Array.from({length: N}, () => Array.from({length: 0}));
    }

    addEdge(from: number, to: number, info: E) {
        this.edges[from].push({
            from: from,
            to: to,
            info: info
        });
    }

    // 这一层导出边集以及 索引->包的关系
    exportEdges() {
        return this.edges.reduce((res, e) => res.concat(e), []);
    }
}

export {Graph}
