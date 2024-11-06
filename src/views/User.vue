<template>
    <div class="user-header">
        <el-button type="primary" @click="addUser">新增</el-button>
        <el-form :inline="true" :model="formInline">
            <el-form-item label="请输入">
                <el-input placeholder="请输入用户名" v-model="formInline.keyWord" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table">
        <el-table :data="userData" style="width: 100%">
            <el-table-column v-for="item in userLabel" :key="item.label" :prop="item.prop"
                :width="item.width ? item.width : 125" :label="item.label" />
                <el-table-column fixed="right" label="Operations" min-width="120">
                <template #="scope">
                    <el-button type="primary" size="small"
                    @click="editUser(scope.row)"
                    >
                        编辑
                    </el-button>
                    <el-button type="danger" size="small"
                    @click="handleDelete(scope.row)"
                    > del </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pager" background layout="prev, pager, next" size="small" :total="config.total"
        @current-change="handleChange" />
    </div>
    <operate-user @event="chiildEvent"></operate-user>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { getCurrentInstance, inject, onMounted, reactive, ref } from 'vue';
import OperateUser from '../components/operateUser.vue';
import { useOpuserStore } from '../store/useOpuserStore';
import { storeToRefs } from 'pinia';
//获取当前组件的实例
const { proxy } = getCurrentInstance()

const api = inject('api')

const formInline = reactive({
    keyWord: ''
})

const config = reactive({
    name: '',
    total: 0,
    page: 1
})

const userData = ref([])

const userLabel = ref([
    {
        prop: "name",
        label: "姓名",
    },
    {
        prop: "age",
        label: "年龄",
    },
    {
        prop: "sexLabel",
        label: "性别",
    },
    {
        prop: "birth",
        label: "出生日期",
        width: 200,
    },
    {
        prop: "addr",
        label: "地址",
        width: 400,
    },
])

//获取用户的数据
const getUserData = async () => {
    const data = await api.getUserData(config)
    userData.value = data.list.map(item => ({
        ...item,
        sexLabel: item.sex === 1 ? '男' : '女'
    }))
    config.total = data.count
    console.log(data, config.total)
}

//搜索用户
const handleSearch = () => {
    config.name = formInline.keyWord
    getUserData()
}

//切换页面
const handleChange = (page) => {
    config.page = page
    getUserData()
}

//删除用户
const handleDelete = async (val) => {
    await ElMessageBox.confirm("为啥删除 ？")
    await api.deleteUser({ id: val.id })
    ElMessage({
        showClose: true,
        message: '删除成功啦',
        type: 'success'
    })
    getUserData()
}  

// //传给子组件的 表单数据
// let formUserA = reactive({})

// 从 pinia 拿到 事件
const {addUserT, editUserT, changeParentForm} = useOpuserStore()

const {formUserB} = storeToRefs(useOpuserStore())

//新增用户模态框
const addUser = () => {
    changeParentForm({ sex: 1 })
    addUserT()
}

//子组件 新增用户 之后，重新获取 用户数据
const chiildEvent = () => {
    getUserData()
}

//重新编辑 用户数据
const editUser = (data) => {
    changeParentForm(data)
    editUserT()
}

onMounted(() => {
    console.log(proxy)
    getUserData()
})
</script>

<style lang="less" scoped>
.user-header {
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    // align-items: center;
}

.table {
    position: relative;

    .el-table {
        height: 520px;
    }

    .pager {
        position: absolute;
        right: 20px;
        bottom: 20px;
        z-index: 9999;
    }
}

</style>