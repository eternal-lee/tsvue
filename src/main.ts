import './assets/index.less'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
// pinia store
import pinia from '@/stores/index'
// vue i18n
import I18n from './languages/index'
console.warn(import.meta.env)

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(I18n)

app.mount('#app')
