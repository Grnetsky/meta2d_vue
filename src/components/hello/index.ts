
import { defineCustomElement } from "vue";  // 引入API

import MyCount from "./hello.ce.vue";  // 引入计数器组件

const CustomElement = defineCustomElement(MyCount);

// 为了便于业务自定义标签名称，导出名称注册方法，默认为my-conut

customElements.define('my-count', CustomElement);

