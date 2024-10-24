<template>
  <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      index:1
  >
    <div v-for="(item,index) in menu.left">
      <el-sub-menu v-if="item.children"  :index="(index+1)+''">
        <template #title>{{item.name}}</template>
        <el-menu-item v-for="(c,i) in item.children" :index="`${index+1}-${i+1}`" @click="dispatchFunc(c.action)">{{ c.name }}</el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else @click="dispatchFunc(item.action)" :index="index+1+''">{{ item.name }}</el-menu-item>
    </div>

  <div class="flex-grow">
  </div>
    <div v-for="(item,index) in menu.right">
      <el-sub-menu v-if="item.children"  :index="(index+1)+''">
        <template #title>
          <div class="title">
            <svg v-if="item.icon" class="l-icon" aria-hidden='true' :class="[item.icon,item.name?'format':'']">
              <use :xlink:href="'#' + item.icon"></use>
            </svg>
     {{item.name}}
          </div>
        </template>
        <el-menu-item v-for="(c,i) in item.children" :index="`${index+1}-${i+1}`" @click="dispatchFunc(c.action,c.value,c.icon)"><i :title="item.name" class="t-icon" :class="c.icon" style="margin-left: 20px;margin-right: 30px"></i>{{ c.name }}</el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else @click="dispatchFunc(item.action,item.value,item.icon)" :index="index+1+''"><i v-if="item.icon" :title="item.name" class="t-icon font-size" :class="item.icon"></i>{{item.name }}</el-menu-item>

    </div>
    <el-sub-menu>
      <template #title>
        缩放
      </template>
      <el-menu-item index="100">
        <el-slider v-model="scaleValue" @input="scaleView"/>
      </el-menu-item>
    </el-sub-menu>

    <el-sub-menu>
      <template #title>
        dxfScale倍数
      </template>
      <el-menu-item index="101">
        <el-slider v-model="scaleDxf" @input="scaleDxfFunc" :min="0.01" :max="10" :step="0.01"/>
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item @click="changeLock" >

      <svg  class="l-icon" aria-hidden="true">
        <use :xlink:href="'#' +lockIcon"></use>
      </svg>
      <i class="t-icon" :class="lockIcon"></i>{{lockStatus}}
    </el-menu-item>
  </el-menu>
</template>

<script lang="js" setup>
import {menu, dispatchFunc, menuFunc} from "../data/defaultsConfig.js"
import {onMounted, ref} from "vue";
import {useEventbus} from "../hooks/useEventbus.js";
import D2M from "dxf"
import {debounce} from "@/data/utils.js";
let lockNumber = 0
let lockStatus = ref("锁定")
let lockIcon = ref("t-unlock")
let scaleValue = ref(10)
let scaleDxf = ref(10)

const lockIcons = ['l-unlock','l-lock','l-wufayidong']
const lockStatusList = ['编辑','预览','锁定']
function changeLock() {
  lockNumber += 1
  lockNumber = lockNumber % 3
  meta2d.store.data.locked = lockNumber
  lockIcon.value = lockIcons[lockNumber]
  lockStatus.value = lockStatusList[lockNumber]
}

const eventbus = useEventbus()

function scaleView(val){
  meta2d.scale((meta2d.store.options.maxScale -  meta2d.store.options.minScale) / 100 *val)
  meta2d.centerView()
}
function scaleDxfFunc(val) {
  console.log(val)
  a(val)
}

const a = debounce(((val)=>{
  const parser = new D2M()
  parser.setOption({scale:val})
  menuFunc.refreshDxf()}),200)
function syncData() {
  menu.right.find((i)=>i.key === 'start').icon =window.meta2d.store.data.fromArrow?('l-to-'+ window.meta2d.store.data.fromArrow) : "l-line"
  menu.right.find((i)=>i.key === 'end').icon =window.meta2d.store.data.toArrow?('l-to-'+ window.meta2d.store.data.toArrow) : "l-line"
}
onMounted(()=>{
  let isPasteAllowed = false;

  const allowPaste = () => {
    isPasteAllowed = true;
    console.log("粘贴已允许。");
  };

  const promptForPastePermission = () => {
    console.log("请在控制台中输入 'ALLOW_PASTE' 以允许粘贴内容。");
  };

// 监听控制台打开
  const detectConsoleOpen = () => {
    const devtools = /./;
    devtools.toString = function() {
      promptForPastePermission();
      return '';
    };
    console.log('%c', devtools);
  };

// 监听用户输入
  window.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'v' && !isPasteAllowed) {
      console.log("请先输入 'ALLOW_PASTE' 来允许粘贴。");
      event.preventDefault();
    }
  });

// 初始化检测
  detectConsoleOpen();

  eventbus.customOn('opened',()=>{
    syncData()
    // meta2d.on("scale",(data)=>{
    //   scaleValue.value = +(data.toFixed(1)*(meta2d.store.options.maxScale -  meta2d.store.options.minScale)).toFixed()
    // })

    meta2d.on('lock',()=>{
      meta2d.store.data.locked = 2
      lockIcon.value = lockIcons[2]
      lockStatus.value = lockStatusList[2]
    })
  })
})

</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
.font-size{
  font-size: 20px;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
}
.t-icon{
  width: 30px;
  height: 30px;
  line-height: 30px;
}
.format{
  position: absolute;
  top: -0px;
  left: 25px;
}
</style>
