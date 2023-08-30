import {createRouter, createWebHashHistory} from "vue-router";
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
                    depth: import.meta.env.VITE_DEPTH_LIMIT
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
        },
        {
            path: "/why/:id",
            name: "Why",
            props: true,
            component: () => import('../views/WhyInstall/index.vue')
        }
    ]
})
