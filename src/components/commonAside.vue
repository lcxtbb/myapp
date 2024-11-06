<template>
    <el-aside :width="isCollapse ? '64px' : '200px'" class="el-menu">
        <el-menu
        background-color = #545c64
        text-color = #fff
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="activeMenu"
        >
            <h3>{{ title }}</h3>
            <el-menu-item v-for="item in noChildren" :index="item.path" :key="item.path"
                @click="handleMenu(item)"
            >
                <component class="icons" :is="item.icon"></component>
                <span>{{ item.label }}</span>
            </el-menu-item>
            <el-sub-menu v-for="item in haveChildren" :index="item.path" :key="item.path">
                <template #title>
                    <component class="icons" :is="item.icon"></component>
                    <span>{{ item.label }}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item v-for="(data,index) in item.children" :index="data.path" :key="data.path" @click="handleMenu(data)">
                        <component class="icons" :is="data.icon"></component>
                        <span>{{ data.label }}</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useMenuStore } from '../store/useMenuStore';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { useTagStore } from '../store/useTagStore';
import { useUserStore } from '../store/useUserStore';

//从pinia 拿到用户菜单数据
const {userMenu} = useUserStore()
const list = computed(() => userMenu)

const {isCollapse, title} = storeToRefs(useMenuStore())


const noChildren = computed(() => list.value.filter(item => !item.children))
const haveChildren = computed(() => list.value.filter(item => item.children))

// console.log(noChildren)

// 定义 全局路由
const router = useRouter()

//定义 当前页面的路由
const route = useRoute()

//菜单栏的 高亮

const activeMenu = computed(() => route.path)

//从 pinia 拿到的 改变tag的方法

const {changeTag} = useTagStore()

// 跳转路由的方法,以及添加 tag
const handleMenu = (item) => {
    console.log(item.path)
    router.push(item.path)
    changeTag(item)
}

//生命周期 函数
onMounted(() => {
    //每次页面刷新时，找到当前路由的tag，添加到pinia中
    let nowDtag = list.value.find(item => item.path === route.path)
    // console.log(nowDtag)
    changeTag(nowDtag) 
})

</script>

<style lang="less" scoped>
    .icons{
        width: 18px;
        height: 18px;
        padding-right: 5px;
    }
    .el-menu{
        background-color: #545c64;
        // width: 200px;
        border-right: none;
        h3{
            line-height: 48px;
            color: #99c2ff;
            text-align: center;
        }
    }
    :deep(.el-menu-item-group__title) {
        display: none;
    }   
</style>