import {GraphOptions} from "@antv/g6-core/lib/types";

const defaultG6Graph: GraphOptions = {
    container: "graph-container",
    width: 1920,
    height: 1080,
    fitView: true,
    defaultNode: {
        type: 'circle',
        size: 100,
        style: {
            fill: '#ffffff',
            stroke: '#f1f1f1f1'
        },
        labelCfg: {
            style: {
                fill: '#000', // 节点标签文字颜色
            },
        }
    },
    defaultEdge: {
        color: '#000',
        style: {
            endArrow: true,

        }
    },
    layout: {
        type: 'force2',
        preventOverlap: true,
        nodeSize: 200,
        edgeStrength: 500,
        nodeStrength: 1500,
        nodeSpacing: 20,
        animate: true,
        maxSpeed: 2000
    },
    modes: {
        default: ['drag-canvas', 'zoom-canvas', 'drag-node', 'activate-relations']
    }
}

export {defaultG6Graph}
