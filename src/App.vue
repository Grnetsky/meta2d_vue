<script setup>
import Main from "./components/Main.vue";
import Nav from "./components/Nav.vue";
</script>

<template>
  <Nav></Nav>
  <Main></Main>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
html,body,#app{
  width: 100%;
  height: 100%;
}
#app {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
