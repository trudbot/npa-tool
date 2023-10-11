import {Queue} from "@datastructures-js/queue";

export interface Edge<T> {
    from: number;
    to: number;
    info: T;
}

// Graph的模板类， 维护边集
// 同时图的所有搜索算法都在此实现
export class Graph<E> {
    edges: Array<Array<Edge<E>>>;
    private readonly invEdges: Array<Array<Edge<E>>>;

    constructor(N: number) {
        this.edges = Array.from({length: N}, () => Array.from({length: 0}));
        this.invEdges = Array.from({length: N}, () => Array.from({length: 0}));
    }

    addEdge(from: number, to: number, info: E) {
        this.edges[from].push({
            from: from,
            to: to,
            info: info
        });
        this.invEdges[to].push({
            from: to,
            to: from,
            info: info
        });
        return this;
    }

    // 这一层导出边集以及 索引->包的关系
    exportEdges(): Edge<E>[] {
        return this.edges.reduce((res, e) => res.concat(e), [])
    }

    // 某个包为什么会被install?
    // 即找出某个顶点的所有直接、间接前驱
    // 在构建图时， 保存了每条边的反向(相当于建了一个无向图)， 所以使得这部分异常容易
    findPredecessors(id: number) {
        const res = this.subGraph(id, -1, true);
        res.edges = res.edges.map(e => {
            return {
                from: e.to,
                to: e.from,
                info: e.info
            }
        })
        return res;
    }

    // 获得指定深度的子图
    subGraph(root: number, depthLimit: number, inv?: boolean) {
        const depth = Array.from({length: this.edges.length}, () => 0);
        let resultEdges: Array<Edge<E>> = [];
        let resultNodes: {id: number; depth: number}[] = [];
        const edgesSource: Array<Array<Edge<E>>> = (inv === true ? this.invEdges : this.edges);
        const queue = new Queue<number>();
        queue.push(root);
        depth[root] = 1;

        while (!queue.isEmpty()) {
            const front = queue.dequeue();
            resultNodes.push({
                id: front,
                depth: depth[front]
            })
            if (depth[front] === depthLimit) {
                continue;
            }
            resultEdges = resultEdges.concat(edgesSource[front]);
            for (let e of edgesSource[front]) {
                if (depth[e.to] === 0) {
                    depth[e.to] = depth[front] + 1;
                    queue.push(e.to);
                }
            }
        }
        return {
            nodes: resultNodes,
            edges: resultEdges
        }
    }

    // 找环

}

