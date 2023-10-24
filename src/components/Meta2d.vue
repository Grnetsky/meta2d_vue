<script setup>
import {deepClone, Meta2d} from "@meta2d/core"
import { flowPens} from "@meta2d/flow-diagram";
import {
  activityDiagram,
  activityDiagramByCtx,
} from "@meta2d/activity-diagram";
import { sequencePens, sequencePensbyCtx } from "@meta2d/sequence-diagram";
import { classPens } from "@meta2d/class-diagram";
import { myTriangle, myTriangleAnchors} from "../../public/path2D/mypath2d/myTriangle.js";
import { register as registerEcharts,registerHighcharts,registerLightningChart  } from "@meta2d/chart-diagram"; // 引入echarts注册函数，原函数名为register 为了与其他注册函数区分这里重命名为registerEcharts
import {computed, nextTick, onMounted, reactive, ref} from "vue";
import {canvasTriangle, canvasTriangleAnchors} from "../../public/canvasDraw/myCanvasDraw/canvasTriangle.js";
import {useEventbus} from "../hooks/useEventbus.js";
import Contextmenu from "./Contextmenu.vue";
const event = useEventbus()

import './hello/index.ts';


onMounted(async ()=>{
  // 创建meta2d对象
  let meta2d = new Meta2d("meta2d")
  meta2d.register(flowPens())

  // 注册注册活动图元
  meta2d.register(activityDiagram())
  // 原生canvas绘画的图库，支持逻辑复杂的需求
  meta2d.registerCanvasDraw(activityDiagramByCtx())

  // 注册时序图
  meta2d.register(sequencePens())
  meta2d.registerCanvasDraw(sequencePensbyCtx())

  // 注册类图
  meta2d.register(classPens())
  // uninstallPlugin('toolBox')
  // 注册表单图元
  meta2d.registerCanvasDraw(formPens())

  // 直接调用Echarts的注册函数
  registerEcharts()

  // 直接调用HighCharts的注册函数
  registerHighcharts()
  // 直接调用LightningChart的注册函数
  registerLightningChart()


  // a.setFuncList({
  //   'root':[
  //     {
  //       name: "测试",
  //       event: 'click',
  //       func(self,pen){
  //         console.log(self,pen)
  //       },
  //
  //       setDom(self,dom){
  //         let html = `<div>
  //               测试按钮
  //           </div>`
  //         let css = `<style>
  //               div {
  //               color: pink;
  //               }
  //           </style>`
  //         return html + css
  //       }
  //     }
  //   ],
  //   'leaf':[{
  //     name: "测试2"
  //   }
  //   ]
  // })
  //注册自定义path2d图元
  meta2d.register({myTriangle})
  // 注册自定义图元的m锚点信息
  meta2d.registerAnchors({ myTriangle: myTriangleAnchors });

  // 注册自定义canvasDraw函数
  meta2d.registerCanvasDraw({canvasTriangle})
  //注册锚点
  meta2d.registerAnchors({canvasTriangle:canvasTriangleAnchors})
  event.customEmit('opened')
  event.customEmit('load')


  // // 获取插件
  // let a = await getPlugin('toolBox')
  // // a.setFuncList({'A':[{
  // //     name:"颜色"
  // //   },],'B':[{
  // //   name:'666'
  // //   }]})
  // // a.getFuncList = (pen)=>{
  // //   return a.funcList['A']
  // // };
  // a.childrenGap = 100
})


</script>

<template>
<!--  meta2d图纸所站位置-->
    <div id="meta2d">
    </div>
  <contextmenu></contextmenu>

</template>

<style scoped>
#meta2d {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #eee;
}
</style>