<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { GlobalStore } from './stores'
import { computed, onMounted } from 'vue'
import { getBrowserLang } from './utils'
import { useI18n } from 'vue-i18n'

const globalStore = GlobalStore()
const i18n = useI18n()

const language = computed(() => {
  return globalStore.language
})

/**
 * 切换语言
 * @param lang 语言
 */
function handleSetLanguage(lang: string) {
  if (language.value == lang) return
  i18n.locale.value = lang
  globalStore.updateLanguage(lang)
}
onMounted(() => {
  handleSetLanguage(String(language.value || getBrowserLang() || ''))
})
</script>

<template>
  <header>
    <div class="switch-lang">
      <div class="btn" :class="{ active: language == 'zh' }" @click="handleSetLanguage('zh')">
        简体中文
      </div>
      <div class="btn" :class="{ active: language == 'en' }" @click="handleSetLanguage('en')">
        English
      </div>
    </div>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld :msg="$t('Headers.title')" />

      <nav>
        <RouterLink to="/">{{ $t('nav[0]') }}</RouterLink>
        <RouterLink to="/about">{{ $t('nav[1]') }}</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped lang="less">
header {
  position: relative;
  max-height: 100vh;
  line-height: 1.5;

  .switch-lang {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;

    .btn {
      display: flex;
      align-items: center;
      width: 60px;
      height: 50px;
      color: var(--color-heading);
      cursor: pointer;

      & + .btn {
        margin-left: 12px;
      }

      &.active {
        color: var(--color-text);
      }
    }

    @media (width < 480px) {
      flex-direction: column;

      .btn {
        & + .btn {
          margin-left: 0;
        }
      }
    }

    @media (width >= 1024px) {
      top: 30px;
    }
  }
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  margin-top: 2rem;
  font-size: 14px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (width >= 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    flex-wrap: wrap;
    place-items: flex-start;
  }

  nav {
    padding: 1rem 0;
    margin-top: 1rem;
    margin-left: -1rem;
    font-size: 1rem;
    text-align: left;
  }
}
</style>
