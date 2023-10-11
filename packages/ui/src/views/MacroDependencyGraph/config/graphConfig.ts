import { GraphOptions } from "@antv/g6";

const defaultG6Graph: GraphOptions = {
    container: "graph-container",
    fitView: true,
    defaultNode: {
        size: 20,
    },
    defaultEdge: {
        size: 1,
        type: 'line',
        style: {
            endArrow: {
                path: '',
                fill: '',
            },
        }
    },
    layout: {
        type: 'force2',
        animate: true,
        // center:[400,400],
        nodeStrength:2000,
        edgeStrength:500,
        // interval:0.005,
        // damping:0.5,
    },
    modes: {
        default: ['drag-canvas', 'zoom-canvas', 'drag-node']
    },
}

export { defaultG6Graph }
