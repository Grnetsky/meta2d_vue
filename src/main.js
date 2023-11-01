import { createApp,defineCustomElement } from 'vue'
import ElementPlus from 'element-plus' // 导入UI组件库
import 'element-plus/dist/index.css' // 导入依赖css文件
import App from './App.vue'
const app = createApp(App)
app.use(ElementPlus) // 全局安装ElementPlus
app.mount('#app')
import MyCount from "./components/hello/hello.ce.vue";  // 引入计数器组件
import { ElButton } from "element-plus"

const CustomElement = defineCustomElement(MyCount);
const B =  defineCustomElement(ElButton);
// 为了便于业务自定义标签名称，导出名称注册方法，默认为my-conut
export function register(tagName = "my-count") {
    customElements.define(tagName, CustomElement);
    return CustomElement;
}

import './components/hello'

customElements.define('el-button',B)