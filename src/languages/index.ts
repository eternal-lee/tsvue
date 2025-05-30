import { createI18n } from 'vue-i18n'
import zh from './locale/zh'
import en from './locale/en'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  globalInjection: true, // 全局注册$t方法
  messages: {
    zh,
    en
  }
})

export default i18n
