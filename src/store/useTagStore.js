import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useTagStore = defineStore("tags", () => {
    
    //定义 tags 数据
    const tags = ref([{
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 'home'
    }])

    //定义全局路由
    const router = useRouter()

    //增加 tags 的函数
    const changeTag = (val) => {
        let index = tags.value.findIndex(item => item.name === val.name)  //如果 tags 已经添加
        index === -1 ? tags.value.push(val) : 1
    }

    // 删除 tag 的函数
    const delTag = (val,route) => {
        console.log(route.path === val.path)
        let index = tags.value.findIndex(item => item.name === val.name)
        if(route.path === val.path && index === tags.value.length - 1) {
            // 如果当前的 tag 是最后一个，跳转到前一个tag   ，  否则跳转到后一个
            router.push(tags.value[index-1].path)
            tags.value.splice(index,1)

        } else {
            router.push(tags.value[index+1].path)
            tags.value.splice(index,1)
        }
    }

    // 退出登录 清空 tag 的函数
    const delAllTag = () => {
        tags.value = [{
            path: '/home',
            name: 'home',
            label: '首页',
            icon: 'home'
        }]
    }

    return {
        tags,
        changeTag,
        delTag,
        delAllTag
    }
})