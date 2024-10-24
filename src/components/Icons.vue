<script setup>
import {defaultIcons, getOtherIcons, pngToPens, svgToPens} from "../data/icons.js";
import { Search } from '@element-plus/icons-vue'

import {computed, onMounted, reactive, ref, watch} from "vue";
import axios from "axios";
import {deepClone} from "@meta2d/core"
const inputValue = ref("")
let iconList =reactive([...defaultIcons])
let dialogTableVisible = ref(false)
onMounted(async ()=>{
  console.log('icons')
  const icons = await getOtherIcons()
  iconList.push(...icons.flat(2))
})
let showList = computed(()=>iconList.filter((i)=>i.show))
function dragPen(data,e){
  const json = JSON.stringify(data)
  e.dataTransfer.setData("Meta2d",json)
}

function onTouchstart(data,e) {
  meta2d.canvas.addCaches = deepClone([data]);
}

async function  changeState(tab){
  if(tab.folder){
    if(!tab.loaded){
      const {data:files} = await axios.get((tab.svg?"/svg/":"/png/")+tab.name+"/")
      tab.loaded = true
      if(tab.svg){
       const fs =  await Promise.all(files.map((f)=>svgToPens(f,tab.name)))
        tab.list = fs
      }else{
        const fs = await Promise.all(files.map((f)=>pngToPens(f,tab.name)))
        tab.list = fs
      }
    }
  }
}
let searchList = reactive([])
function doSearch(value){
  value = value.trim()  // 清除空格
  searchList = []  // 重置表格
  if(value){  // 输入有值
    // 遍历搜索
    showList.value.forEach((item)=>{
      searchList.push(...item.list.filter((i)=>i.name.includes(value)))
    })
  }else {
    searchList = []  //设置为空
  }
}
</script>

<template>
  <div class="icons">
    <div class="icon_search">
      <el-input
          v-model="inputValue"
          size="small"
          placeholder="搜索图元"
          :prefix-icon="Search"
          @input="doSearch"
          class="search_input"
      />
      <div class="icon_search_container">
        <div class="icon_item" v-for="(item,index) in searchList" draggable="true" @dragstart="dragPen(item.data,$event)" :index="index" :title="item.name">
          <i v-if="item.icon" class="icon-size" :class="item.icon"></i>
          <img v-else-if="item.image" :src="item.image"  />
          <div v-else-if="item.svg" v-html="item.svg"></div>
        </div>
      </div>
    </div>
    <div class="icon_list">
      <el-collapse>
        <template v-for="(icons) in showList">
        <el-collapse-item :title="icons.name" @click="changeState(icons)">
          <div class="icon_container">
            <div class="icon_item" v-for="(item,index) in icons.list" draggable="true"
                 @dragstart="dragPen(item.data,$event)"
                 @click.stop="onTouchstart(item.data, $event)"

                 :key="index" :title="item.name">
<!--              这里做了修改-->
              <svg v-if="item.icon" class="l-icon" aria-hidden="true">
                <use :xlink:href="'#' + item.icon"></use>
              </svg>
              <img v-else-if="item.image" :src="item.image"/>
              <div v-else-if="item.svg" v-html="item.svg"></div>
            </div>
          </div>
        </el-collapse-item>
        </template>
      </el-collapse>
    </div>
    <div class="icon_manage">
      <el-button @click="dialogTableVisible = !dialogTableVisible">
        管理图元
      </el-button>
    </div>
  </div>
  <el-dialog v-model="dialogTableVisible" title="图元库管理" center align-center>
    <div class="icon_manage_container">
      <div class="icon_manage_item" v-for="item in iconList">
        <el-switch v-model="item.show" />{{item.name}}
      </div>
    </div>
  </el-dialog>
</template>

<style scoped>
.icons {
  width: 300px;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}

.icon-size {
  font-size: 25px !important;
  width: 25px;
}

img {
  max-width: 25px;
  max-height: 25px;
  margin: 4px;
}

.icon_search {
  max-height: 400px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.icon_list {
  padding: 5px 10px;
  overflow: auto;
  flex: 1;
}

.icon_manage {
  border-top: 1px solid #eee;
  display: flex;
  padding:16px 0;
  justify-content: center;
  align-items: center;
}
.icon_container{
  display: flex;
  justify-content: flex-start;
  overflow: auto;
  flex-wrap: wrap;
  align-content: center;
}
.icon_search_container{
  padding: 0 10px;
  max-height: 200px;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
}
.icon_item{
  padding: 5px;
  cursor: pointer;
}
img {
  width: 25px;
  height: 25px;
}
.icon_search_container::-webkit-scrollbar,.icon_list::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.icon_search_container::-webkit-scrollbar-thumb,.icon_list::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  height: 20px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #4e4e4e;
}
.icon_search_container::-webkit-scrollbar-track,.icon_list::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ffffff;
}
.search_input{
   padding: 10px 10px;
}
.icon_search_container::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.icon_search_container::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  height: 20px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #4e4e4e;
}
.icon_search_container::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ffffff;
}

.icon_manage_container{
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  overflow: auto;
}
.icon_manage_item{
  display: flex;
  justify-content: space-between;
}
</style>