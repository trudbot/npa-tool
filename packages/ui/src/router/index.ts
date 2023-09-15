import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/HomePage/index.vue"
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
            component: Home,
            props: true,
            children: [
                {
                    path: "module",
                    component: () => import("../views/SideBar/components/Module.vue"),
                    name: "Module"
                },
                {
                    path: "graph",
                    component: () => import("../views/SideBar/components/Graph.vue"),
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
