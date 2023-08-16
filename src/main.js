import { createApp } from 'vue'
import ElementPlus from 'element-plus' // 导入UI组件库
import 'element-plus/dist/index.css' // 导入依赖css文件
import App from './App.vue'
const app = createApp(App)
app.use(ElementPlus) // 全局安装ElementPlus
app.mount('#app')
