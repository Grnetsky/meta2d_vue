<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import {eventType, eventBehavior} from "../../data/defaultsConfig.js";

let activePen = reactive({})
let event = reactive({
  name:"",
  action:"",
  value:""
})
let otherParams = []
let depList = computed(()=>{
  let _b =  b.find(i=>i.behavior===event.action)
  otherParams = _b?.depend.map(i=>i.params) || []
  return _b
})
let b = reactive(eventBehavior)
onMounted(()=>{
  meta2d.on('active',(pen)=>{
    if(pen.length === 1){
      activePen = pen[0]
      if(!activePen.events){
        activePen.events = []
      }else {
        // 有事件？
        const actEvent = activePen.events[0]
        if(actEvent){
          event.name = actEvent.name
          event.action = actEvent.action
          otherParams.forEach(i=>event[i]=actEvent[i])
        }else {
          event.name = ""
          event.action = ""
          event.value = ""
        }
      }
    }else {
      activePen = undefined
    }
  })
})
function removeEvent() {
  activePen.events = []
  event.name = ""
  event.action = ""
  event.value = ""

}
function confirmEvent() {
  let otherProps = depList.value.depend?.map(i=>{
    let p = {}
    p[i.bindProp] = i.bindData
    return p
  }
  ) || []
  const e = {
    name:event.name,
    action:event.action,
  }
  Object.assign(e,...otherProps)
  activePen.events = [e]
}
</script>

<template>
  <div class="event">
      <el-form @submit="(e)=>e.preventDefault()">
        <el-form-item label="事件类型" >
          <el-select v-model="event.name" placeholder="选择事件类型" >
          <el-option
              v-for="e in eventType"
              :key="e.event"
              :label="e.name"
              :value="e.event"
          >
          </el-option>
        </el-select>
        </el-form-item>

        <!--        行为类型-->
        <el-form-item label="行为类型">
          <el-select  v-model="event.action" placeholder="选择行为类型">
            <el-option
                v-for="i in eventBehavior"
                :key="i.behavior"
                :label="i.name"
                :value="i.behavior"
            >
            </el-option>
          </el-select>
        </el-form-item>

<!--        事件类型依赖表单-->
        <el-form-item :label="dep.name" v-for="dep in depList?.depend">
          <el-input v-model="dep.bindData" :placeholder="dep.option?.placeholder || '请输入'" v-if="dep.type==='input'" @[dep.event]="dep.func" :type="dep.option?.type||'text'"/>
          <!--          选择框-->
          <el-select v-model="dep.bindData" :placeholder="dep.option.placeholder" v-else-if="dep.type==='select'">
            <el-option
                v-for="item in dep.option.list"
                :key="item.value"
                :label="item.name"
                :value="item.value"
                :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </el-form-item>



        <div class="event_button">
          <el-button @click="confirmEvent" type="primary" style="width: 100%;margin-right: 14px">确认事件</el-button>
          <el-button @click="removeEvent" type="danger" style="width: 100%;margin-right: 14px">清除事件</el-button>

        </div>
      </el-form>
  </div>
</template>

<style scoped>
.event_button{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.event {
  margin: 10px;
}
</style>