<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <TheWelcome />
  </main>

  <div class="quarter"></div>
  <div class="quarter-border"></div>

  <div class="single-border"></div>
</template>

<style lang="less" scoped>
.quarter {
  width: 100px;
  height: 100px;
  background-color: #f0f;
  border-radius: 100px 0 0;
}

.quarter-border {
  box-sizing: border-box;
  width: 200px;
  height: 200px;
  border: 100px solid transparent;
  border-right-color: #f00;
  border-radius: 100px;
}

.single-border {
  position: relative;
  width: 200px;
  height: 200px;
}

.single-border::after {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 200%;
  height: 200%;
  content: '';
  border: 1px solid black;
  transform: scale(0.5, 0.5);
  transform-origin: 0 0;
}
</style>
