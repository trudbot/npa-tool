import { createRouter, createWebHashHistory, createWebHistory } from "vue-router"

import NodeGraph from "../views/NodeInfoSideBar/NodeGraph.vue"
import NodeModule from "../views/NodeInfoSideBar/NodeModule.vue"


//2. 路由配置
const routes = [
    //redirect 重定向也是通过 routes 配置来完成，下面就是从 / 重定向到 /index
    {
        path: "/",
        redirect: "/index/module",
        children:[
            { path: "/index/module", component: NodeModule },
            { path: "/index/graph", component: NodeGraph },
        ]
    },
    
]

// 3. 创建路由实例
const router = createRouter({
    // （1）采用hash 模式
    history: createWebHashHistory(),
    // （2）采用 history 模式
    // history: createWebHistory(),
    routes, //使用上方定义的路由配置
})

// 4. 导出router
export default router

