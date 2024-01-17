<script setup>
const props = defineProps(['formList'])
</script>

<template>
  <el-collapse>
    <el-collapse-item  v-for="item in props.formList" :title="item.title">
      <el-form @submit="(e)=>e.preventDefault()">
        <el-form-item v-for="i in item.children" :label="i.title">
          <!--          输入框-->
          <el-input v-model="i.bindProp[i.prop]" :placeholder="i.option?.placeholder || '请输入'" v-if="i.type==='input'" @[i.event]="i.func" :type="i.option?.type||'text'"/>
<!--          文件框-->
          <el-button v-else-if="i.type==='file'"><label for="input" >
            <input id="input" style="display: none" type="file" :accept="i.option?.accept || '*/*'" @[i.event]="i.func" >
              选择文件
            </label>
          </el-button>
<!--          数字框-->
          <el-input-number :placeholder="i.option?.placeholder || '请输入'" :step="i.option?.step || 1" v-model="i.bindProp[i.prop]" :min="i.option?.min ?? -Infinity" :max="i.option?.max ?? Infinity" @[i.event]="i.func" v-else-if="i.type==='number'"/>
<!--          选择框-->
          <el-select v-model="i.bindProp[i.prop]" :placeholder="i.option.placeholder" v-else-if="i.type==='select'" @[i.event]="i.func">
            <el-option
                v-for="item in i.option.list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
            >
             <div v-if="item.template" class="select_template" v-html="item.template"></div>
            </el-option>
          </el-select>

<!--          取色器-->
          <el-color-picker v-model="i.bindProp[i.prop]" show-alpha v-else-if="i.type === 'color'" @[i.event]="i.func"/>
<!--          开关-->
          <el-switch v-model="i.bindProp[i.prop]" v-else-if="i.type==='switch'" @[i.event]="i.func"/>

<!--          按钮-->
          <el-button :type="i.option.type" v-else-if="i.type === 'button'" @[i.event]="i.func" :style="i.middle?'width:100%;margin: auto;':''">{{i.option.title}}</el-button>

        </el-form-item>
      </el-form>

    </el-collapse-item>
  </el-collapse>
</template>

<style scoped>
:deep(.el-collapse-item__header) {
  font-weight: 1000;
}
:deep(.el-collapse-item__content){
  margin-right: 15px;
}
</style>