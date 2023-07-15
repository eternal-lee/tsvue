# ts-vue

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

#### 项目中报警告：warning Unexpected any. Specify a different type @typescript-eslint/no-explicit-any

只需要在“package.json”文件中找到“eslintConfig”配置项的“rules”，添加上 "@typescript-eslint/no-explicit-any": ["off"]然后重启项目就行了。

#### Pinia 中文文档

See [Pinia 中文文档](https://pinia.web3doc.top/)

#### pinia-plugin-persistedstate

See [适用于 Pinia 的持久化存储插件](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/)
