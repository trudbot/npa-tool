import {createRouter, createWebHashHistory} from "vue-router";
import NodeGraph from "../views/NodeInfoSideBar/components/NodeGraph.vue"
import NodeModule from "../views/NodeInfoSideBar/components/NodeModule.vue"
export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            // component: () => import('../views/HomePage/index.vue'),
            redirect: {
                name: "Graph",
                params: {
                    id: 0,
                    depth: -1
                }
            }
        },
        {
            path: "/dependencies/:id/:depth",
            name: "Dependencies",
            component: () => import('../views/HomePage/index.vue'),
            props: true,
            children: [
                {
                    path: "module",
                    component: NodeModule,
                    name: "Module"
                },
                {
                    path: "graph",
                    component: NodeGraph,
                    name: "Graph"
                }
            ]
        }
    ]
})
