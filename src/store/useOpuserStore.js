import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useOpuserStore = defineStore("user", () => {

    //控制对话框是否显示
    const dialogVisible = ref(false)

    //新增和编辑共用一个窗口，所以通过设置action区分
    const action = ref("add")

    // //表单数据
    const formUserB = ref({
        sex: 1
    })

    //改变 表单数据
    const changeParentForm = (data) => {
        formUserB.value = data
        console.log(formUserB)
    }

    //添加用户改变模态框状态
    const addUserT = () => {
        dialogVisible.value = true
        action.value = 'add'
    }

    //编辑用户 打开 模态框
    const editUserT = () => {
        dialogVisible.value = true
        action.value = ''
    }

    //关闭模态框
    const resetDia = () => {
        dialogVisible.value = false
    }

    return {
        dialogVisible,
        action,
        formUserB,
        changeParentForm,
        addUserT,
        editUserT,
        resetDia
    }
})