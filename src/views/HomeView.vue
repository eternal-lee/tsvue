<template>
  <div class="home">
    <img alt="Vue logo" class="logo" src="../assets/logo.png" />
    <HelloWorld
      msg="Welcome to Your Vue.js + TypeScript App"
      @updateVal="updateVal"
    />

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
  </div>
  <!-- 浏览器原生弹窗 给他一个id  id.show()、id.showModel() 打开  id.close() 关闭  id:backdrop{} css伪类蒙层 -->
  <dialog open>
    <div class="win">
      <p>这还是一个弹窗</p>
      <button>关闭</button>
    </div>
  </dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld
  },
  setup () {
    function updateVal (val: number) {
      console.warn(val)
    }

    return {
      updateVal
    }
  }
})
</script>

<style lang="less" scoped>
.logo {
  width: 100px;
}
.quarter {
  width: 100px;
  height: 100px;
  border-radius: 100px 0 0;
  background-color: #f0f;
}
.quarter-border {
  width: 200px;
  height: 200px;
  border: 100px solid #fff;
  border-right-color: #f00;
  box-sizing: border-box;
  border-radius: 100px;
}

.single-border {
  position: relative;
  width: 200px;
  height: 200px;
}
.single-border::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 200%;
  height: 200%;
  border: 1px solid black;
  box-sizing: border-box;
  transform: scale(0.5, 0.5);
  transform-origin: 0 0;
}

.snip {
  width: 200px;
  height: 200px;
  background: #000;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.snip span {
  margin: 5px;
  animation: 0.5s upDown infinite ease-in-out;
  animation-delay: calc(0.1s * var(--i));
}

@keyframes upDown {
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
    transform: translateY(0px);
  }
}
</style>
