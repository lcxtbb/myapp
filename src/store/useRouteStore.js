import { defineStore } from "pinia";
import { ref } from "vue";

export const useRouteStore = defineStore('route', () => {
    //定义切换登录状态
    const isAddRoute = ref(false)

    //改变登录状态
    const changeRoute = (val) => {
        isAddRoute.value = val
    }

    return {
        isAddRoute,
        changeRoute
    }
})