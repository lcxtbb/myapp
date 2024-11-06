<template>
        <el-row class="home" :gutter="24">
            <el-col :span="8">
                <el-card shadow="hover" class="userT">
                    <div class="user">
                        <img :src="getImgurl('user')" class="imgUrl" />
                        <div class="user-info">
                            <p>Admin</p>
                            <p>超级管理员</p>
                        </div>
                    </div>
                    <div class="login">
                        <p>上次登陆时间：<span>2024-10-28</span></p>
                        <p>上次登陆地点：<span>成都</span></p>
                    </div>
                </el-card>
                <el-card shadow="hover" class="user-table">
                    <el-table :data="tableData">
                        <el-table-column v-for="(item, index) in tableLabel" :label="item" :prop="index">

                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="16">
                <div class="userM">
                    <el-card class="count" v-for="item in countData" :key="item.name" shadow="hover">
                        <component :is="item.icon" class="icons" :style="{ background: item.color }"></component>
                        <div class="detail">
                            <p>￥{{ item.value }}</p>
                            <p>￥{{ item.name }}</p>
                        </div>
                    </el-card>
                </div>
                <div style="height: 458px;">
                    <el-scrollbar style="height: 100%;">
                    <el-card class="top-echart" shadow="hover">
                        <div ref="echart" style="height: 250px;"></div>
                    </el-card>
                    <div class="graph">
                        <el-card shadow="hover">
                            <div ref="userEchart" style="height: 250px;"></div>
                        </el-card>
                        <el-card shadow="hover">
                            <div ref="videoEchart" style="height: 250px;"></div>
                        </el-card>
                    </div>
                </el-scrollbar>
                </div>
            </el-col>
        </el-row>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref, getCurrentInstance, inject, reactive } from 'vue';
import * as echarts from 'echarts'

const { proxy } = getCurrentInstance()
const api = inject('api')

const getImgurl = (user) => new URL(`../assets/images/${user}.png`, import.meta.url).href

const tableLabel = ref({
    name: "课程",
    todayBuy: "今日购买",
    monthBuy: "本月购买",
    totalBuy: "总购买",
})

const xOptions = reactive({
    // 图例文字颜色
    textStyle: {
        color: "#333",
    },
    legend: {},
    grid: {
        left: "20%",
    },
    // 提示框
    tooltip: {
        trigger: "axis",
    },
    xAxis: {
        type: "category", // 类目轴
        data: [],
        axisLine: {
            lineStyle: {
                color: "#17b3a3",
            },
        },
        axisLabel: {
            interval: 0,
            color: "#333",
        },
    },
    yAxis: [
        {
            type: "value",
            axisLine: {
                lineStyle: {
                    color: "#17b3a3",
                },
            },
        },
    ],
    color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
    series: [],
})

const pieOptions = reactive({
    tooltip: {
        trigger: "item",
    },
    legend: {},
    color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
    ],
    series: []
})

const tableData = ref([])

const countData = ref([])             

let saleEchart,userEcharts,viedoEcharts    //三个表的初始化数据

const observer = ref(null)

const getTableData = async () => {
    const res = await api.getTableData()
    // console.log(res)
    tableData.value = res.tableData
}

const getCountData = async () => {
    const res = await api.getCountData()
    // console.log(res)
    countData.value = res
}

const getEcharData = async () => {
    const { orderData, userData, videoData } = await api.getEcharData()
    console.log(orderData, userData, videoData)
    oneEchart(orderData)
    twoEchart(userData)
    thrEchart(videoData)    

    //监听页面变化
    observer.value = new ResizeObserver(() => {
        // console.log(oneEchart  )
        saleEchart.resize()
        userEcharts.resize()
        viedoEcharts.resize()
    })

    if(proxy.$refs['echart']){
        observer.value.observe(proxy.$refs['echart'])
    }
}

const oneEchart = (orderData) => {
    xOptions.xAxis.data = orderData.date
    xOptions.series = Object.keys(orderData.data[0]).map(val => ({
        name: val,
        data: orderData.data.map(item => item[val]),
        type: 'line'
    }))
    // xOptions.series = xOptions.series.filter(item => item.name ==='苹果')
    saleEchart = echarts.init(proxy.$refs['echart'])
    saleEchart.setOption(xOptions)
}

const twoEchart = (userData) => {
    xOptions.xAxis.data = userData.map(item => item.date)
    xOptions.series = [{
        name: '新增用户',
        data: userData.map(item => item.new),
        type: 'bar'
    }, {
        name: '活跃用户',
        data: userData.map(item => item.active),
        type: 'bar'
    }]
    userEcharts = echarts.init(proxy.$refs['userEchart'])
    userEcharts.setOption(xOptions)
}

const thrEchart = (videoData) => {
    pieOptions.series = [
        {
            data: videoData,
            type: 'pie'
        }
    ]
    viedoEcharts = echarts.init(proxy.$refs['videoEchart'])
    viedoEcharts.setOption(pieOptions)
}

onMounted(() => {
    getTableData()
    getCountData()
    getEcharData()
})
</script>


<style lang="less" scoped>

:deep(.userT .el-card__body) {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

:deep(.count .el-card__body) {
    display: flex;
    gap: 20px;
    padding: 0;
}

// .el-card {
//     min-width: 400px;
// }

.home {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .user {
        padding-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 40px;
        border-bottom: 1px solid #ccc;

        .imgUrl {
            border-radius: 50%;
            width: 150px;
            height: 150px;
        }

        .user-info {
            display: flex;
            flex-direction: column;
            gap: 20px;
            text-align: center;
        }

        .user-info>:nth-child(1) {
            font-size: 40px;
        }

        .user-info>:nth-child(2) {
            color: #999;
        }

    }

    .login {
        display: flex;
        flex-direction: column;
        gap: 10px;
        color: #999;

        span {
            color: #666;
            margin-left: 60px;
        }
    }

    .user-table {
        margin-top: 20px;
    }

    .userM {

        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;

        .count {
            width: 32%;
            margin-bottom: 20px;
            // box-sizing: border-box;
        }

        .icons {
            width: 60px;
            height: 60px;
            line-height: 80px;
        }

        .detail {
            display: flex;
            flex-direction: column;
            gap: 20px;
            align-items: center;
            justify-content: center;
        }
    }

    .graph {
        display: flex;
        justify-content: space-between;

        .el-card {
            width: 49%;
        }
    }

}
</style>