<script setup>
import {deepClone, Meta2d,connectLine} from "@meta2d/core"
import { flowPens} from "@meta2d/flow-diagram";
import {
  activityDiagram,
  activityDiagramByCtx,
} from "@meta2d/activity-diagram";
import { sequencePens, sequencePensbyCtx } from "@meta2d/sequence-diagram";
import { classPens } from "@meta2d/class-diagram";
import { mindPens,installPlugin,getPlugin,mindAnchors } from "mind-diagram"
import { CollapseChildPlugin } from "mind-plugins-collapse"
import {createDom, toolBoxPlugin, defaultFuncs, butterfly} from "mind-plugins-core"
import { myTriangle, myTriangleAnchors} from "../../public/path2D/mypath2d/myTriangle.js";
import { register as registerEcharts,registerHighcharts,registerLightningChart  } from "@meta2d/chart-diagram"; // 引入echarts注册函数，原函数名为register 为了与其他注册函数区分这里重命名为registerEcharts
import { formPens } from '@meta2d/form-diagram';
import {computed, nextTick, onMounted, reactive, ref} from "vue";
import {canvasTriangle, canvasTriangleAnchors} from "../../public/canvasDraw/myCanvasDraw/canvasTriangle.js";
import {useEventbus} from "../hooks/useEventbus.js";
import Contextmenu from "./Contextmenu.vue";
const event = useEventbus()


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
  meta2d.register(mindPens(CollapseChildPlugin,toolBoxPlugin))

  meta2d.registerAnchors(mindAnchors())
  // uninstallPlugin('toolBox')
  // 注册表单图元
  meta2d.registerCanvasDraw(formPens())
  let func = {
    key:"func1",
    name:"功能函数1",
    img: "https://www.le5le.com/img/%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88_icon_%E7%89%A9%E8%81%94%E7%BD%91_selected.png",
    event: "click",
    func(self,pen,dom){
      console.log('执行功能函数1',self,pen,dom)
    },
    children:[
      {
        key:'child1',
        name:"子选项1",
        event:"click",
        func(self,pen,dom,father){
          console.log("child1: ",self,pen,dom,father)
        }
      },
      {
        key:'child2',
        img: "https://www.le5le.com/img/%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88_icon_%E7%89%A9%E8%81%94%E7%BD%91_selected.png",
        name:"子选项2",
        event:"mouseenter",
        func(self,pen,dom,father){
          console.log("child2: ",self,pen,dom,father)
        }
      },
      {
        key:'child3',
        icon:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" t="1698915834790" class="icon" viewBox="0 0 1365 1024" version="1.1" p-id="13181" width="50" height="30"><path d="M920.32924106 188.22098215H435.74469865c-178.43219866 0-323.49023438 145.05719866-323.49023438 323.49023436 0 178.43219866 145.05803572 323.49023438 323.49023438 323.49023439h484.58454241c178.43303572 0 323.49023438-145.05803572 323.49023437-323.49023439 0.14481026-178.28822544-144.91322544-323.49023438-323.49023437-323.49023436z m2.65345982 603.01339285H439.05440848c-145.05719866 0-281.40652902-137.4375-281.40652903-281.19475447 0-145.05803572 132.71735492-270.29966518 277.77455357-270.29966518h489.52064732c145.05803572 0 272.32700893 131.98995536 272.32700893 275.74720983 0 143.61328125-129.22935267 275.74720982-274.28738839 275.74720982z" p-id="13182"/></svg>',
        name:"子选项3",
        setDom(self,dom){
          let div = createDom('div',{color:'red'})
          div.innerHTML = self.name
          return div
        },
        event:"click",
        func(self,pen,dom,father){
          console.log("child3: ",self,pen,dom,father)
        },
        stopPropagation:true,
      }
    ],
    closeShadowDom:true,
    closeEven:false,
    openChildDomEvent:'mouseenter',
    closeChildDomEvent: 'mouseleave',
    openEventOnTitle:false,
    closeChildDom(self,pen,dom){
      console.log('xxxxxxxcloase')
      // dom.style.height = 'max-height'
      // dom.style.visibility = 'hidden'
      // dom.style.overflow = 'hidden'
      // dom.style.transition = '.3s'
      // dom.style.height = 0'
      dom.style.transformOrigin = 'top';
      dom.style.transform = 'scaleY(0)'
      return true
    },
    openChildDom(self,pen,dom){
      console.log('xxxxxxopen')
      // // dom.style.transition ="all .3s ease"
      // dom.style.overflow = 'hidden'
      // // dom.style.height = '300px'
      // dom.style.transition = 'none'
      // dom.style.height = 'auto'
      // const height = dom.offsetHeight
      // dom.style.height = '0'
      // dom.offsetHeight
      dom.style.transition = 'all .3s'
      // dom.style.height = height + 'px'
      // console.log('123')
      dom.style.transform = 'scaleY(1)'

      return true
    }
  }
  // toolBoxPlugin.setFuncList({'root':[func]})
  butterfly.MAXLENGTH = 8
  // 直接调用Echarts的注册函数
  registerEcharts()

  // 直接调用HighCharts的注册函数
  registerHighcharts()
  // 直接调用LightningChart的注册函数
  registerLightningChart()

  // installPlugin(CollapseChildPlugin)

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