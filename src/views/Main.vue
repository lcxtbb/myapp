<template>
    <div class="layout">
        <el-container class="layout-container">
            <common-aside />
            <el-container>
                <el-header class="common-header">
                    <common-header />
                </el-header>
                <common-tag></common-tag>
                <el-main class="common-main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import CommonAside from '../components/commonAside.vue';
import CommonHeader from '../components/commonHeader.vue';
import CommonTag from '../components/commonTag.vue';

</script>

<style lang="less" scoped>
.layout,
.layout-container {
    height: 100%;
    overflow: hidden;
}

.common-header {
    background-color: #333;
}

.common-main {
    width: 100%;
    height: 100%;
    // overflow: hidden;
}
</style>