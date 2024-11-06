import { createApp } from 'vue'
import App from './App.vue'
import "@/assets/less/index.less"
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import "../src/api/mock"
import api from "../src/api/api"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)  // pinia 数据持久化

const app = createApp(App)

// app.config.globalProperties.$api = api
app.provide('api',api)

app.use(router)

app.use(ElementPlus)

app.use(pinia)

app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }