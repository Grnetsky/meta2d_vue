<script setup>
import Form from "../Form.vue";
import {computed, onMounted, reactive} from "vue";
import { mapProps } from "../../data/defaultsConfig.js";
import {useEventbus} from "../../hooks/useEventbus.js";
let m = reactive(mapProps)
const eventbus = useEventbus()
function loadOptionsFromMeta2d(options,target){
  for(let i in target){
    target[i] = (options[i] || target[i])
  }
}
onMounted(()=>{
  meta2d.on('opened',()=>{
    const options = meta2d.data()
    loadOptionsFromMeta2d(options,m)
    loadOptionsFromMeta2d(options,meta2d.getOptions())
    eventbus.customEmit('opened')
  })
  // 初始化
  const options = meta2d.getOptions()
  loadOptionsFromMeta2d(options,m)
  meta2d.fileName = m.fileName


})
const map = computed(()=>{
  return [
    {
      title:"文件", //显示名
      children:[
        {
          title:"文件名",
          type:"input",
          option:{
            type:"text",
            placeholder:"请输入文件名"
          },
          prop:"fileName",
          bindProp:m,// 绑定的属性
          event:"change",
          func:function arg1(value){
            meta2d.fileName = value
        }
        },
      ]
    }, {
      title:"画布", //显示名
      children:[
        {
          title:"默认颜色",
          type:"color",
          prop:"color",
          event:"change",
          bindProp:m, // 绑定的属性
          func(value){
            meta2d.setOptions({
              color:value
            })
            meta2d.render()
          }
        },{
          title:"画笔填充颜色",
          type:"color",
          prop:"penBackground",
          bindProp:m, // 绑定的属性
          event:"change",
          func(value){
            meta2d.store.data.penBackground = value
            meta2d.render()
          }
        },
        {
          title:"背景颜色",
          type:"color",
          prop:"background",
          bindProp:m, // 绑定的属性
          event:"change",
          func(value){
            meta2d.setBackgroundColor(value)
            meta2d.render()
          }
        },
        {
          title:"背景图片",
          type:"file",
          prop:"backGroundImage",
          bindProp:m, // 绑定的属性
          event:"change",
          option: {
            accept: "image/*"
          },
          func(e){
            let file = e.target.files[0]
            let fileUrl = URL.createObjectURL(file)  // 创建文件引用
            meta2d.setBackgroundImage(fileUrl)
            meta2d.render()
          }
        },
        {
          title:"标尺",
          type:"switch",
          prop:"rule",
          bindProp:m, // 绑定的属性
          event:"change",
          func(value){
            meta2d.setRule({
              rule:value
            })
            meta2d.render()
          }
        },
        {
          title:"标尺颜色",
          type:"color",
          prop:"ruleColor",
          bindProp:m, // 绑定的属性
          event:"change",
          func(value){
            meta2d.setRule({
              ruleColor:value
            })
            meta2d.render()
          }
        },
        {
          title:"网格",
          type:"switch",
          prop:"grid",
          bindProp:m, // 绑定的属性
          event:"change",
          func(value){
            meta2d.setGrid({
              grid:value
            })
            meta2d.render()
          }
        },
        {
          title:"网格颜色",
          type:"color",
          prop:"gridColor",
          bindProp:m, // 绑定的属性
          event:"change",
          func(value){
            meta2d.setGrid({
              gridColor:value
            })
            meta2d.render()
          }
        },
        {
          title:"网格大小",
          type:"number",
          prop:"gridSize",
          bindProp:m, // 绑定的属性
          event:"change",
          option:{
            min:1,
            max:100
          },
          func(value){
            meta2d.setGrid({
              gridSize:+value
            })
            meta2d.render()
          }
        },
        {
          title:"网格角度",
          type:"number",
          prop:"gridRotate",
          bindProp:m, // 绑定的属性
          event:"change",
          option:{
            min:-Infinity,
            max:Infinity
          },
          func(value){
            meta2d.setGrid({
              gridRotate:+value
            })
            meta2d.render()
          }
        }
      ]
    }
  ]
})
</script>

<template>
  <div class="mapProps">
    <Form :form-list=map ></Form>
  </div>
</template>

<style scoped>
</style>