<script setup>
import Icons from "./Icons.vue";
import Meta2d from "./Meta2d.vue";
import Setting from "./Setting.vue";

</script>

<template>
  <div class="main">
    <Icons></Icons>

    <Meta2d ></Meta2d>
    <Setting></Setting>
  </div>
</template>

<style scoped>

.main{
  flex:1;
  height: calc(100% - 59px);
  display: flex;
  justify-content: flex-start;
}


</style>