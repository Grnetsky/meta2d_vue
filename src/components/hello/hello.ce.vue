// src/MyCount/MyCount.ce.vue
<script setup lang="ts">
import { ref,defineProps } from 'vue';
let props = defineProps(['name'])
const count = ref(0);
const addCount = () => {
  count.value = count.value + 1;
}
</script>

<template>
  <div class="container">
    <span class="title">我来自web组件：{{name}}</span>
    <span>计数器值: {{ count }}</span>
    <el-button type="primary" @click="addCount">点击增加</el-button>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 8px 16px 0 rgba(37, 43, 58, 0.16);
  width: 180px;
  gap: 16px;
  .title {
    font-weight: bold;
  }
}
</style>
