import { GraphOptions } from "@antv/g6-core/lib/types";
import G6 from "@antv/g6";

const defaultG6Graph: GraphOptions = {
  container: "graph-container",
  width: 1920,
  height: 1080,
  fitView: true,
  defaultNode: {
    // type: 'rect',
    // size: [200, 50],
    size: 8,
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
    center:[400,400],
    nodeStrength:500,
    edgeStrength:1500,
    interval:0.005,
    damping:0.5,
  },
  modes: {
    default: ['drag-canvas', 'zoom-canvas', 'drag-node']
  },
}

export { defaultG6Graph }
