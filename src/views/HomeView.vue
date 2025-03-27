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
  <div class="snip">
    <span style="--i: 1">拼</span>
    <span style="--i: 2">命</span>
    <span style="--i: 3">加</span>
    <span style="--i: 4">载</span>
    <span style="--i: 5">中</span>
    <span style="--i: 6">.</span>
    <span style="--i: 7">.</span>
    <span style="--i: 8">.</span>
  </div>
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

.snip {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  color: #fff;
  background: #000;
}

.snip span {
  margin: 5px;
  animation: 0.5s up-down infinite ease-in-out;
  animation-delay: calc(0.1s * var(--i));
}

@keyframes up-down {
  0% {
    transform: translateY(0);
  }

  25% {
    transform: translateY(-24px);
  }

  50% {
    transform: translateY(0);
  }

  75% {
    transform: translateY(10px);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
