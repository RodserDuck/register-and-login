import{createRouter,createWebHashHistory,createWebHistory} from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:'/',
            redirect:{path:'/login'},
        },
        {
        path:'/login',
        component: Login,
        },
        {
        path:'/index',
        component: Home,
        },
    ],
})

export default router