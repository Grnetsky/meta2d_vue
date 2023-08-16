<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import {useEventbus} from "../hooks/useEventbus.js";
let isPens = ref(false)
let ctxMenu = ref()
let activePens = []

let menuPos = reactive({
  top:-9999,
  left:-9999,
  visible:false
})

const calcMenuPos = computed(()=>{
  return {
    top:menuPos.top+"px",
    left:menuPos.left+"px",
    visible:menuPos.visible?"visible":"hidden"
  }
})

const eventBus = useEventbus()
eventBus.customOn('load',()=>{
  window.addEventListener('contextmenu',(e)=>{
    e.preventDefault()
    ctxMenu.value.focus()
  })
  meta2d.on('contextmenu',({e})=>{
    menuPos.top = e.clientY
    menuPos.left = e.clientX
    menuPos.visible = true
    ctxMenu.value.focus()
  })
  meta2d.on("active",(pens)=>{
    if(pens.length>0){
      activePens = reactive(pens)
      isPens.value = true
    }else {
      isPens.value = false
      activePens = []
    }
  })
  meta2d.on('inactive',()=>{
    isPens.value = false
  })
})
function changeCoverage(pos){
  switch (pos){
    case "top":
      meta2d.top(activePens)
      break
    case "bottom":
      meta2d.bottom(activePens)
      break
    case "up":
      meta2d.up(activePens)
      break
    case "down":
      meta2d.down(activePens)
      break
  }
  ctxMenu.value.blur()
}

function lock() {
  meta2d.lock(2)
  meta2d.emit('lock')
  ctxMenu.value.blur()
}

function paste() {
  meta2d.paste()
  ctxMenu.value.blur()
}
function copy() {
  meta2d.copy(activePens)
  ctxMenu.value.blur()
}

function ctxMenuClose() {
  menuPos.visible = false
}

</script>

<template>
  <div class="contextmenu" ref="ctxMenu" tabindex="-1" @blur="ctxMenuClose">
    <div class="ctx_item" v-show="isPens" @click="changeCoverage('top')">置顶</div>
    <div class="ctx_item" v-show="isPens" @click="changeCoverage('bottom')">置底</div>
    <div class="ctx_item" v-show="isPens" @click="changeCoverage('up')">上一图层</div>
    <div class="ctx_item" v-show="isPens" @click="changeCoverage('down')">下一图层</div>
    <div class="ctx_item" @click="lock">锁定</div>
    <div class="ctx_item" v-show="isPens" @click="copy">复制</div>
    <div class="ctx_item" @click="paste">粘贴</div>
  </div>
</template>

<style scoped>

.contextmenu {
  padding: 6px;
  position: absolute;
  top: v-bind("calcMenuPos.top");
  left:v-bind("calcMenuPos.left");
  visibility: v-bind("calcMenuPos.visible");
  background-color: #fff;
  max-height: 5000px;
  width: 180px;
  z-index: 999;
  border-radius: 10px;
}
.ctx_item{
  width: 100%;
  padding: 10px;
  cursor: pointer;
  transition: background-color .5s ease;
}
.ctx_item:hover{
  background-color: #eeeeee;
}
</style>