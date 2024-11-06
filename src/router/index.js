
import { createRouter, createWebHashHistory } from "vue-router";
import RouterConfig from './config'
import { useUserStore } from "../store/useUserStore";
import { computed } from "vue";
import { useRouteStore } from "../store/useRouteStore";

const routes = [
    {
        path: '/',
        name: 'main',
        component: () => import("@/views/Main.vue")
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("@/views/Login.vue")
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

//路由守卫
router.beforeEach((to, from, next) => {
    // 从 pinia 拿到数据,获得登陆状态
    const {token} = useUserStore()
    const {isAddRoute} = useRouteStore()
    console.log(router.getRoutes())
    if(to.name === 'login'){
        next()
    } else {
        if(!token) {
            next({
                path: '/login'
            })
        } else {
            if(!isAddRoute) {
                router.removeRoute("main")
                configRouter()
                next({
                    path: to.fullPath
                })
            } else {
                next()
            }
        }
    }
})

const configRouter = () => {
    //添加路由 main
    router.addRoute({
        path: '/main',
        name: 'main',
        component: () => import("@/views/Main.vue")
    })

    //获得登录验证 函数
    const {changeRoute} = useRouteStore()

    // 验证 pinia 中的路由路径， 通过的话，添加到main 里面
    RouterConfig.forEach(item => {
        checkPermission(item.path) && router.addRoute("main", item)
    })

    //重定向
    router.addRoute("main", {
        path:'/',
        redirect:'/home'
    })
    // 404
    router.addRoute({
        path:"/:pathMatch(.*)*",
        name:"not found",
        component: () => import("@/views/NotFound.vue")
    })

    //改变登录验证状态
    changeRoute(true)
}

//验证 路由 是否合法的函数
const checkPermission = (path) => {
    const {setMenu} = useUserStore()
    // let userMenuT = computed(() => userMenu)
    // userMenuT = userMenuT.value.map(item => item.path)
    // console.log(userMenuT)
    return setMenu.includes(path)
}

export default router