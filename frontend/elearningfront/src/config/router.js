import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/home/Home.vue'
import AdminPages from '../views/admin/AdminPages.vue'

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    },
    {
        name: 'adminPages',
        path: '/admin',
        component: AdminPages
    }
]

const router = createRouter({
    history: createWebHistory(), // Use HTML5 history mode
    routes
})

export default router;
