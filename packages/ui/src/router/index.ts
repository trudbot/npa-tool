import {createRouter, createWebHashHistory} from "vue-router";
import NodeGraph from "../views/NodeInfoSideBar/components/NodeGraph.vue"
import NodeModule from "../views/NodeInfoSideBar/components/NodeModule.vue"
import Module from "../views/SideBar/components/Module.vue";
import Graph from "../views/SideBar/components/Graph.vue"
import Global from "../views/SideBar/components/Global.vue"
export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            // component: () => import('../views/HomePage/index.vue'),
            redirect: {
                name: "Global",
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
                    component: Module,
                    name: "Module"
                },
                {
                    path: "graph",
                    component: Graph,
                    name: "Graph"
                },
                {
                    path: "global",
                    name: "Global",
                    component: Global
                }
            ]
        }
    ]
})
