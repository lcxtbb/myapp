<template>
    <div class="body-login">
        <el-form :model="loginForm" :rules="rules" ref="userForm">
            <h1>登录吧</h1>
            <el-form-item prop="username">
                <el-input type="input" placeholder="这是用户名" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" placeholder="这是密码" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click.stop="loginTap">登录按钮这是</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { getCurrentInstance, inject, reactive, ref } from 'vue';
import { useUserStore } from '../store/useUserStore';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

//拿到当前组件的实例
const {proxy} = getCurrentInstance()

//定义全局路由
const router = useRouter()

//从 pinia 拿到方法
const { changeUser, changeToken, changeMenu } = useUserStore()

//拿到 api
const api = inject('api')

//登录规则
const rules = reactive({
    username: [{ required: true, message: "账号得写啊", trigger: "blur" }],
    password: [
        { required: true, message: "密码也得写啊", trigger: "blur" }],
})


// 定义 form 的数据
const loginForm = reactive({
    username: '',
    password: ''
})

//登录
const loginTap = () => {
    proxy.$refs['userForm'].validate(async (vaild) => {
        console.log(12345)
        if (vaild) {
            console.log(1)
            const res = await api.getMenu(loginForm)
            changeUser(res.menuList)
            changeToken(res.token)
            changeMenu(res.setMenu)
            router.push('/home')
        } else {
            console.log(12)
            ElMessage({
                showClose: true,
                message: '账号错了还是密码错了?',
                type: 'error'
            })
        }
    })
}
</script>

<style lang="less" scoped>
.body-login {
    width: 100%;
    height: 100%;
    background-image: url("../assets/images/background.png");
    background-size: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    .el-form {
        width: 400px;
        background-color: #f5f5f5;
        border: 1px solid #eaeaea;
        border-radius: 15px;
        padding: 35px 35px 15px 35px;
        box-shadow: 0 0 25px #cacaca;

        h1 {
            text-align: center;
            margin-bottom: 20px;
            color: #505450;
            font-weight: 550;
        }

        :deep(.el-form-item__content) {
            justify-content: center;
        }
    }
}
</style>