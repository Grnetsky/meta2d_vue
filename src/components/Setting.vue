<script setup>
import {onMounted, ref} from "vue";
import MapProps from "./MapProps/Map.vue";
import Global from "./MapProps/Global.vue";
import Appearance from "./PenProps/Appearance.vue";
import Event from "./PenProps/Event.vue";
import Animate from "./PenProps/Animate.vue";
const props = defineProps(['activeType'])
let activeName1 = ref('map')
let activeName2 = ref('appearance')
let activeName3 = ref('appearance')
let activePen = ref(false)
let multiPen = ref(false)
onMounted(()=>{
  console.log('setting')
  // 监听鼠标点击事件，返回
  meta2d.on('active',(args)=>{
    if(args.length >= 1) activePen.value = true
    if(args.length >1){
      multiPen.value = true
    }else {
      multiPen.value = false
    }
  })
  meta2d.on('inactive',()=>{
    activePen.value = false
    multiPen.value = false
  })
})
</script>

<template>

  <div class="setting">

    <div class="tz_props" v-show="!activePen">
      <el-tabs v-model="activeName1" class="demo-tabs"  active-name="first">
        <el-tab-pane label="图纸" name="map" class="tab" >
         <MapProps></MapProps>
        </el-tab-pane>
        <el-tab-pane label="全局配置" name="global" class="tab"><Global></Global></el-tab-pane>
      </el-tabs>
    </div>

    <div class="ty_props" v-show="activePen && !multiPen">
      <el-tabs v-model="activeName2" class="demo-tabs">
        <el-tab-pane label="外观" name="appearance" >
          <Appearance></Appearance>
        </el-tab-pane>
        <el-tab-pane label="事件" name="event" >
          <Event></Event>
        </el-tab-pane>
        <el-tab-pane label="动效" name="animate">
          <Animate></Animate></el-tab-pane>
      </el-tabs>
    </div>

    <div class="ty_props" v-show="activePen && multiPen">
      <el-tabs v-model="activeName3" class="demo-tabs">
        <el-tab-pane label="外观" name="appearance" >
          <Appearance></Appearance>
        </el-tab-pane>
      </el-tabs>
    </div>
</div>
</template>

<style scoped>
.setting {
  position: relative;
  display: flex;
  width: 350px;
  padding: 16px 0 0 16px;
  overflow: auto;
  box-shadow: 0 2px 4px 0 #dad7d7;
}
:deep(.el-tabs__header){
  margin: 0;
}
:deep(.el-tabs__content::-webkit-scrollbar) {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
:deep(.el-tabs__content::-webkit-scrollbar-thumb) {
  /*滚动条里面小方块*/
  border-radius: 10px;
  height: 20px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #4e4e4e;
}
:deep(.el-tabs__content::-webkit-scrollbar-track) {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ffffff;
}
.tz_props{
  display: flex;
  width: 100%;
}
.ty_props{
  display: flex;
  width: 100%;
}
:deep(.el-tabs__header){
  height: 40px;
}
:deep(.el-tabs__content){
  flex: 1;
  overflow: auto;
}:deep(.el-tabs){
  display: flex;
  flex-direction: column;
  width: 100%;
 }
</style>