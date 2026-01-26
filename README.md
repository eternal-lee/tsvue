# vite库模式打包npm

This template should help get you started developing with Vue 3 in Vite.

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

// 或者

```sh
npm run build:lib
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## lib目录结构

```javascript
📦lib                   库目录
┣ 📂components          组件目录
┃ ┣ 📂ieterButton       组件目录
┃ ┃ ┣ 📂src             src
┃ ┃ ┃ ┣ 📜index.css     css
┃ ┃ ┃ ┗ 📜index.vue     vue
┃ ┃ ┗ 📜index.ts        组件注册
┃ ┗ 📜index.ts          组件导出
┗ 📜index.ts            全局导出
```

- lib\components\ieterButton\index.ts 组件进行注册

```javascript
import type { App } from 'vue'
import _ieterButton from './src/index.vue'
import styles from './src/index.css?raw'

// 把组件css引入 方便webComponents使用
const c = _ieterButton as any
c.styles = c.styles ? [...c.styles, styles] : [styles]

const install = (app: App<Element>) => {
  app.component(String(c.name), c)
}

;(c as any).install = install

export default c

```

- lib\components\index.ts 把组件给导出

```javascript
export { default as ieterButton } from './ieterButton'
```

- lib\index.ts 全局注册并按需导出

```javascript
import { defineCustomElement } from 'vue'
import type { App } from 'vue'
import ieterButton from './components/ieterButton'

const components = { ieterButton, ... }
const version = '0.0.1'

// 自动注册所有组件----自定义webComponents
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
 // ...
 app.use(component)
}

// 按需导入
export * from './components'

export default { version, install, register }
```

## 库模式build配置

```javascript
build: {
  sourcemap: false,
  minify: true, // 开启压缩
  cssMinify: true,
  outDir: 'es',
  lib: {
    // Could also be a dictionary or array of multiple entry points
    entry: resolve(__dirname, 'lib/index.ts'),
    name: 'myLib',
    formats: ['iife', 'umd', 'es'],
    // the proper extensions will be added
    fileName: '[库名称]' //  fileName: 'index'
  },
  rollupOptions: {
    // 确保外部化处理那些你不想打包进库的依赖
    external: ['vue'],
    output: {
      // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
      globals: {
        vue: 'Vue'
      },
      // 避免同时使用命名和默认导出时的警告
      exports: 'named'
    }
  }
}
```

```json
{
  "name": "包名",
  // ... 其他
  "main": "es/[库名称].umd.cjs",
  "module": "es/[库名称].js",
  "exports": {
    ".": {
      "import": "./es/[库名称].js",
      "require": "./es/[库名称].umd.cjs"
    }
  }
}
```

## 构建npm包

- 配置.npmignore文件 忽略不需要打包到npm里面的文件
- 文件声明 \*.d.ts
- css引入(或按需引入)

### 配置.npmignore文件

配置.npmignore文件，只保留package.json、构建目录...

### 构建npm包 文件声明 \*.d.ts

```json
{
  "name": "包名",
  // ... 其他
  "types": "es/types/index.d.ts",
  "exports": {
    ".": {
      "types": "./es/types/index.d.ts"
      // ... 其他
    }
  }
}
```

```javascript
import dts from 'vite-plugin-dts'

plugins: [
  vue(),
  dts({
    entryRoot: './lib',
    // 指定 tsconfig 文件路径
    tsconfigPath: './tsconfig.lib.json',
    // 自定义输出目录
    outDir: 'es/types'
  })
]
```

新增文件/tsconfig.lib.json

```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "include": ["env.d.ts", "lib/**/*"],
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["lib/*"]
    }
  }
}
```

### 构建npm包 css引入

```javascript
npm install vite-plugin-libcss --save-dev

import libcss from 'vite-plugin-libcss'

plugins: [
  vue(),
  libcss() // 将 CSS 注入到 JS 中
}
```

- 如果不安装插件则需引入css文件

**注意的是，需要的package.json中进行配置**

```json
{
  // ...其他
  "exports": {
    ".": {
      // ...其他
    },
    "./index.css": "./es/index.css",
    "./es/index.css": "./es/index.css",
    "./es/*": "./es/*",
    "./lib/*": "./lib/*"
  }
  // ...其他
}
```

```javascript
// 引入全部css
import '@ieter/components/index.css'
```

```javascript
// 或者按需引入
import '@ieter/components/lib/components/***/src/index.css'
```

## package.json 所有配置

```json
{
  // ...其他
  "types": "es/types/index.d.ts",
  "files": ["es", "lib/**/*.css"],
  "main": "es/index.umd.cjs",
  "module": "es/index.js",
  "exports": {
    ".": {
      "types": "./es/types/index.d.ts",
      "import": "./es/index.js",
      "require": "./es/index.umd.cjs"
    },
    "./index.css": "./es/index.css",
    "./es/index.css": "./es/index.css",
    "./es/*": "./es/*",
    "./lib/*": "./lib/*"
  }
  // ...其他
}
```
