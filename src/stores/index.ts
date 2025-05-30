import { createPinia, defineStore } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { GlobalState } from './interface'

export const GlobalStore = defineStore({
  id: 'GlobalStore',
  state: (): GlobalState => ({
    // language
    language: 'en',
    counter: 0,
    id: ''
  }),
  actions: {
    add() {
      this.counter++
    },
    // updateLanguage
    updateLanguage(language: string) {
      if (!language) return
      this.language = language
    }
  },
  // persist: true
  persist: {
    storage: sessionStorage
  }
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
