import { defineStore } from "pinia";
import {  ref } from "vue";

export const useUserStore = defineStore('loginUser', () => {

    // 定义登录的用户的菜单
    const userMenu = ref([])

    //用户的token
    const token = ref('')

    //定义登陆的用户的 路由
    const setMenu = ref([])

    //改变 user
    const changeUser = (data) => {
        userMenu.value = data
        // console.log(userMenu.value)
    }

    //改变token
    const changeToken = (val) => {
        token.value = val
    }

    //改变登录用户的 路由
    const changeMenu = (data) => {
        setMenu.value = data
    }

    return {
        changeUser,
        userMenu,
        token,
        changeToken,
        setMenu,
        changeMenu
    }
},
{
    persist:true
})