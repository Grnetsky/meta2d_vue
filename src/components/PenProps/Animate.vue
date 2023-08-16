<script setup>
import {animateType} from "../../data/defaultsConfig.js";
import {onMounted, reactive, ref, toRaw} from "vue";

let m = reactive(animateType)
let animate = ref({
  name:"",
  frames:[],
  key:"",
  duration:0,
  autoPlay:false,
  animateCycle:Infinity
})

let activePen = {}

onMounted(()=>{
  meta2d.on('active',(pens)=>{
    animate.value = {
      name:"",
      frames:[],
      key:"",
      duration:0,
      autoPlay:false,
      animateCycle:Infinity
    }
    if(pens.length === 1){
      activePen = reactive(pens[0])
    }
    if(pens[0]){
      animate.value.autoPlay = activePen.autoPlay ||false
      animate.value.animateCycle = activePen.animateCycle || Infinity
      animate.value.frames = activePen.frames || []
      animate.value.name = activePen.animateName || ''
      animate.value.duration = activePen.animateDuration || 0
    }

  })
})
function changeAnimate(f){
  animate.value.duration = f[0].duration
}

function startAnimate(){
  activePen.animateName = animate.value.name
  activePen.animateDuration = animate.value.frames[0].duration
  activePen.frames = animate.value.frames
  activePen.autoPlay = animate.value.autoPlay
  activePen.animateCycle = animate.value.animateCycle
  meta2d.startAnimate(activePen.id)
}

function pauseAnimate() {
  meta2d.pauseAnimate(activePen.id)
}

function stopAnimate() {
  meta2d.stopAnimate(activePen.id)
}
</script>

<template>
<div class="animate">
  <el-form @submit="(e)=>e.preventDefault()">
    <el-form-item label="动画类型" >
      <el-select v-model="animate.frames" value-key="id" placeholder="选择事件类型" @change="changeAnimate">
        <el-option
            v-for="e in m"
            :key="e.key"
            :label="e.name"
            :value="e.frames"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="动画时长" >
      <el-input v-model="animate.duration" disabled/>

    </el-form-item>

    <el-form-item label="自动播放" >
      <el-switch v-model="animate.autoPlay"/>

    </el-form-item>
    <div class="event_button">
      <el-button @click="startAnimate" type="primary" style="width: 60px;font-size: 10px">开始动画</el-button>
      <el-button @click="pauseAnimate" type="danger" style="width: 60px;font-size:10px">暂停动画</el-button>
      <el-button @click="stopAnimate" type="danger" style="width: 60px;font-size:10px">停止动画</el-button>
    </div>
  </el-form>
</div>
</template>

<style scoped>
.animate {
  margin: 10px;
}

.event_button{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
</style>