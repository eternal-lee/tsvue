import type { App } from 'vue'
import _ieterButton from './src/index.vue'
import styles from './src/index.css?raw'

const c = _ieterButton as any
c.styles = c.styles ? [...c.styles, styles] : [styles]

const install = (app: App<Element>) => {
  app.component(String(c.name), c)
}

;(c as any).install = install

export default c
