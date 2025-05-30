<script setup lang="ts">
defineOptions({
  name: 'HelloWorld'
})

defineProps<{ msg: string }>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3 v-html="$t('Headers.description')"></h3>
  </div>
</template>

<style scoped>
h1 {
  position: relative;
  top: -10px;
  font-size: 2.6rem;
  font-weight: 500;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (width >=1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
