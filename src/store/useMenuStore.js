import { defineStore } from "pinia";
import { ref } from "vue";

export const useMenuStore = defineStore("menu", () => {

    const isCollapse = ref(false)
    
    const title = ref('通用后台管理')

    const changeCollpase = () => {
        isCollapse.value = !isCollapse.value
        title.value = isCollapse.value ? '管理' : '通用后台管理'
    }

    return {
        title,
        isCollapse,
        changeCollpase
    }
})