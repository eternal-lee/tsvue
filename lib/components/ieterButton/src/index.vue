<template>
  <button
    :class="['ieter-button', `ieter-button--${type}`, { 'is-disabled': disabled }]"
    :disabled="disabled"
    @click.stop="handleClick"
  >
    <template v-if="$slots.default">
      <slot>文本</slot>
    </template>
    <template v-else>{{ text }}</template>
  </button>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'ieterButton'
})

export interface ButtonProps {
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  text?: string | number
  disabled?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  text: '文本',
  disabled: false
})

const emits = defineEmits(['click'])

function handleClick(event: Event) {
  if (!props.disabled) {
    emits('click', event)
  }
}
</script>

<style scoped>
@import url('./index.css');
</style>
