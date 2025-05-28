<template>
  <div class="about">
    <h2>This is an about page</h2>
    <div class="pic" data-index="5px">测试css属性</div>
    <div class="box" @click="increment">{{ counter }} - {{ globalStore.id }}</div>

    <div class="circle">
      <!-- <div class="semi semi1"></div>
      <div class="semi semi2"></div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { GlobalStore } from '@/stores/index'
import { computed, ref } from 'vue'
// (async () => {
//   console.log(1)
//   setTimeout(function () {
//     console.log('2')
//   }, 0)
//   await new Promise(function (resolve: (value: number) => void, reject) {
//     console.log('3')
//     resolve(4)
//   }).then(function () {
//     console.log('4')
//   })
//   console.log('5')
// })()
const globalStore = GlobalStore()
globalStore.$patch({
  // counter: 1,
  id: '2323'
})

const counter = computed(() => globalStore.counter)

let increment = ref().value
increment = () => {
  globalStore.add()
}

const width = '200px'

/**
 * 数组
 * @param nums 数字
 * @param target 目标值
 */
function twoNums(nums: number[], target: number): number[][] {
  const arr = nums
  const arrs: number[][] = []
  for (let i = 0; i <= arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        arrs.push([i, j])
      }
    }
  }

  return arrs
}

console.warn(twoNums([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 9))

/**
 * 求和
 * @param n 值
 */
function addNum(n: number): number {
  if (n === 1) {
    return 1
  } else {
    return addNum(n - 1) + n
  }
}

console.warn(addNum(100))
</script>

<style lang="less" scoped>
@width: v-bind(width);

@headerColor: #0000ff;

.pic {
  width: @width;
  height: @width;
  color: @headerColor;

  &::before {
    color: #f0f;
    content: attr(data-index);
  }
}

.box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 200px;
  height: 200px;
  user-select: none;
  background:
    linear-gradient(to left bottom, transparent 50%, rgb(0 0 0 / 60%) 0) no-repeat 100% 0 / 3em 3em,
    linear-gradient(225deg, transparent 2.1em, #58a 0);
}

.circle {
  width: 0;
  height: 0;
  border-color: transparent transparent rgb(75 214 11);
  border-style: solid;
  border-width: 100px;
  border-radius: 100%;
}

.semi {
  position: absolute;
  width: 200px;
  height: 200px;
  background-color: #f00;
  clip: rect(0 200px 200px 100px);
}

.semi2 {
  background-color: #fff;
  transform: rotate(65deg);
}
</style>
