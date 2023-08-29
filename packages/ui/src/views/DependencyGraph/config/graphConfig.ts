import { GraphOptions } from "@antv/g6-core/lib/types";
import G6 from "@antv/g6";

// 提示框
const tooltip = new G6.Tooltip({
  offsetX: 10,
  offsetY: 10,
  // the types of items that allow the tooltip show up
  // 允许出现 tooltip 的 item 类型
  itemTypes: ['node', 'edge'],
  // custom the tooltip's content
  // 自定义 tooltip 内容
  getContent: (e:any) => {
    const outDiv = document.createElement('div');
    outDiv.style.width = 'fit-content';
    outDiv.style.padding = '0px 20px 10px 0px';
    if (e === undefined) return outDiv;
    if (e.item === null) return outDiv;
    if(e.target.get('name') === 'edge-shape'){
      outDiv.innerHTML = `
      <h4 style="margin-left:20px">边信息</h4>
      <ul>
        <li>依赖类型: ${e.item.getModel().info}</li>
      </ul>
      `;
    }else{
      {
        outDiv.innerHTML = `
        <h4 style="margin-left:20px">节点信息</h4>
        <ul>
          <li>名称: ${e.item.getModel().name}</li>
        </ul>
        <ul>
          <li>版本: ${e.item.getModel().version}</li>
        </ul>
        <ul>
          <li>路径: ${e.item.getModel().path}</li>
        </ul>
        `;
      }
    }
    return outDiv;
  },
});
// 工具栏
const toolbar = new G6.ToolBar({
  position: { x: 10, y: 10 },
});

const defaultG6Graph: GraphOptions = {
  container: "graph-container",
  defaultNode: {
    type: 'rect',
    size: [200, 50],
  },
  defaultEdge: {
    type: 'polyline',
    size: 3,
    color: '#D1C2EF',
    style: {
      endArrow: {
        path: 'M 0,0 L 8,4 L 8,-4 Z',
        fill: '#e2e2e2',
      },
      radius: 20,
    }
  },
  layout: {
    type: 'dagre',
    rankdir: 'LR',
    controlPoints: true,
    nodesepFunc: () => 1,
    ranksepFunc: () => 150,
  },
  modes: {
    default: ['drag-canvas', 'zoom-canvas', 'drag-node', 'activate-relations']
  },
  plugins: [tooltip,toolbar],
  // 设置为true，启用 redo & undo 栈功能
  enabledStack: true,
}

export { defaultG6Graph }
