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

function twoNums(nums: Array<number>, target: number): Array<any> {
  const arr = nums
  const arrs: Array<Array<number | string>> = []
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
  height: v-bind(width);
  color: @headerColor;
  &::before {
    content: attr(data-index);
    color: var(--theme_color);
  }
}

.box {
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  min-width: 200px;
  width: 100%;
  height: 200px;
  background:
    linear-gradient(to left bottom, transparent 50%, rgba(0, 0, 0, 0.6) 0) no-repeat 100% 0 / 3em
      3em,
    linear-gradient(225deg, transparent 2.1em, #58a 0);
  // background: linear-gradient(225deg, transparent 50px, blue 50px);
}

.circle {
  width: 0px;
  height: 0px;
  border-width: 100px;
  border-style: solid;
  border-color: transparent transparent rgb(75, 214, 11) transparent;
  border-radius: 100%;
}
.semi {
  background-color: #f00;
  position: absolute;
  width: 200px;
  height: 200px;
  clip: rect(0 200px 200px 100px);
}
.semi2 {
  background-color: #fff;
  transform: rotate(65deg);
}
</style>
