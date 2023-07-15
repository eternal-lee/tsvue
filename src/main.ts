import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/mockjs/index.js'

import { copyRightConsole } from './utils'
import './utils/test'

const packageInfo: any = { name: 'vue-ts', version: '0.1.0' }
copyRightConsole(packageInfo)

createApp(App).use(store).use(router).mount('#app')
