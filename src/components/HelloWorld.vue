<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <p>
      For a guide and recipes on how to cure / customize this project,<br />
      check out the vue-cli documentation.
    </p>
    <h3>Installed CLI Plugins</h3>

    <div @click="clickHandle(1212)">￥{{ money }}--{{ width }}</div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  defineProps,
  withDefaults,
  defineEmits,
  defineComponent
} from 'vue'
import type { Ref } from 'vue'

const year: Ref<number | string> = ref('300')
const month = ref<number | string>(12)

console.warn(year.value, month.value)

defineComponent({ name: 'HelloWorld', components: {} })

// defineProps<{ // 采用ts专有声明，无默认值
// value?: Number,
// theme?: String
// }>()
// 采用ts专有声明，有默认值
interface Props {
  msg: string;
  value?: number | string;
  theme?: string; // ?:是指可选参数
}
const props = withDefaults(defineProps<Props>(), {
  msg: '',
  value: 0,
  theme: 'blue'
})

// 使用ts的泛型指令props类型
// const { money = 0, car = '小黄车' } = defineProps<{
//   money?: number
//   car?: string
// }>()

// 非ts声明
// const emits = defineEmits(['updateVal'])
// ts声明
// eslint-disable-next-line func-call-spacing
const emits = defineEmits<{
  (e: 'updateVal', val: number): void;
  (e: 'updateVal1', val: number): void;
}>()

const width = ref(props.value as number)

// const money = ref<number>(100)
// 推荐写法，提供效率
const money = ref(100)

// function clickHandle (val: number) {
//   emits('updateVal', val)
// }
// 或者下面 使用事件报错 => 使用ref来解决
let clickHandle = ref().value
clickHandle = (val: number) => {
  emits('updateVal', val)
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
