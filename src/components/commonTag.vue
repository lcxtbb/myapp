<template>
    <div class="tabs">
        <el-tag
            v-for="(item, index) in tags"
            :key="item.name"
            :closable="item.name !== 'home'"
            :effect="route.name === item.name ? 'dark' : 'plain'"
            @click="handleMenu(item)"
            @close="handleClose(item)"
        >
            {{ item.name }}
        </el-tag>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTagStore } from '../store/useTagStore';
import { storeToRefs } from 'pinia';

//拿到 pinia tag 的数据
const {tags} = storeToRefs(useTagStore())
const {delTag} = useTagStore()

// 找到 当前页面的路由
const route = useRoute()

//定义全局路由
const router = useRouter()

//点击 tag 跳转页面
const handleMenu = (item) => {
    // console.log(item.path)
    router.push(item.path)
}

//点击 tag 关闭页面
const handleClose = (item) => {
    // console.log(route)
    delTag(item,route)
}

</script>

<style lang="less" scoped>

.tabs {
    padding-left: 20px;
    padding-top: 20px;
    display: flex;
    gap: 10px;

    // .el-tag {
        
    // }
}
</style>