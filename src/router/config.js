const routers = [
    {
        path: '/home',
        name: 'home',
        component: () => import("@/views/Home.vue")
    },
    {
        path: '/user',
        name: '用户管理',
        component: () => import("@/views/User.vue")
    },
    {
        path: '/mall',
        name: 'mall',
        component: () => import("@/views/Mall.vue")
    },
    {
        path: '/other/page1',
        name: 'page1',
        component: () => import("@/views/others/pageOne.vue")
    },
    {
        path: '/other/page2',
        name: 'page2',
        component: () => import("@/views/others/pageTwo.vue")
    },

]

export default routers