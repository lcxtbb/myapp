<template>
    <div class="header">
        <div class="l-content">
            <el-button size="small" @click="menuTap">
                <component is="menu" class="icons"></component>
            </el-button>
            <el-breadcrumb separator="/" class="bread">
                <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img :src="getImgurl('user')" class="userImg"/>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item @click="handleExit">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useMenuStore } from '../store/useMenuStore';
import { useUserStore } from '../store/useUserStore';
import { useRouter } from 'vue-router';
import { useRouteStore } from '../store/useRouteStore';
import { useTagStore } from '../store/useTagStore';

//定义全局路由
const router = useRouter()

const {changeCollpase} = useMenuStore()

const menuTap = () => {
    changeCollpase()
}

const getImgurl = (user) => new URL(`../assets/images/${user}.png`,import.meta.url).href

//退出登录,从 pinia 拿到数据
const {changeUser, changeToken, changeMenu} = useUserStore()
const {changeRoute} = useRouteStore()
const {delAllTag} = useTagStore()

const handleExit = () => {
    changeRoute(false)
    changeToken('')
    changeUser([])
    changeMenu([])
    delAllTag()
    router.push('/login')
}
</script>

<style lang="less" scoped>
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #333;
}

.icons{
    width: 20px;
    height: 20px;
}

.l-content{
    display: flex;
    align-items: center;
    .el-button{
        margin-right: 10px;
    }
}

.r-content{
    .userImg{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}

:deep(.bread span){
    color: #fff !important;
    cursor: pointer !important;
}



</style>