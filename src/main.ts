import './assets/index.less'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
console.warn(import.meta.env)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
