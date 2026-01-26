import { defineCustomElement } from 'vue'
import type { App } from 'vue'
import ieterButton from './components/ieterButton'
import ieterFoo from './components/ieterFoo'

const components = { ieterButton, ieterFoo }
const version = '0.0.1'

// 自动注册所有组件----webComponents
function register() {
  Object.values(components).forEach((component) => {
    // 组件名转为自定义元素名（如 foo -> foo-element，可自定义规则）
    const _name = component.name ? component.name : 'ieter-' + component
    const tag = _name
      .replace(/([A-Z])/g, '-$1')
      .replace(/^-/, '')
      .toLowerCase()
    customElements.define(tag, defineCustomElement(component))
  })
}

function install(app: App) {
  for (const key in components) {
    if (components.hasOwnProperty(key)) {
      const component = components[key as keyof typeof components]
      app.use(component)
    }
  }
}

// 按需导入
export * from './components'

export default { version, install, register }
