import {createRouter, createWebHashHistory} from "vue-router";
export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            // component: () => import('../views/HomePage/index.vue'),
            redirect: {
                name: "Home",
                params: {
                    id: 1,
                    depth: -1
                }
            }
        },
        {
            path: "/dependencies/:id/:depth",
            name: "Home",
            component: () => import('../views/HomePage/index.vue'),
            props: true
        }
    ]
})
