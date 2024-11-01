import{createRouter,createWebHashHistory,createWebHistory} from 'vue-router'
import { useUserStore } from '../store/user'
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
            // 添加重定向
            redirect: '/article/manager',
                // 添加嵌套路由
            // 通过children来添加嵌套路由的配置
                children: [
                    // 添加一个一个的嵌套路由配置，和之前的的配置基本上没有区别
                    {
                    path: '/article/channel',
                    // 箭头函数
                    component: () => import('../views/article/Channel.vue'),
                    },
                    {
                    path: '/article/manager',
                    // 箭头函数
                    component: () => import('../views/article/Manager.vue'),
                    },
                    {
                    path: '/user/profile',
                    // 箭头函数
                    component: () => import('../views/user/Profile.vue'),
                    },
                    {
                    path: '/user/avatar',
                    // 箭头函数
                    component: () => import('../views/user/Avatar.vue'),
                    },
                    {
                    path: '/user/password',
                    // 箭头函数
                    component: () => import('../views/user/Password.vue'),
                    },
                ],
        },
    ],
})

router.beforeEach((to,from)=>{
    const userStore = useUserStore()
    if(to.path!='/login'){
        if (!userStore.getToken()) {
            // }
              return { path: '/login' }
            }
    }
    // 返回 false 以取消导航，没有返回false,默认就会通过
    // return false
})




export default router