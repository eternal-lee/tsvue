import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import stylelint from 'vite-plugin-stylelint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    host: true
  },
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11', 'chrome > 52'],
      modernPolyfills: true
    }),
    stylelint({
      fix: true, // 启用自动修复
      include: ['**/*.{css,scss,sass,less}'], // 指定要检查的文件类型
      exclude: ['node_modules/**', 'dist/**'], // 排除某些目录或文件
      configFile: '.stylelintrc.json' // 指定 Stylelint 的配置文件路径
    }),
    AutoImport({
      dts: true,
      imports: ['vue', 'vue-router', 'pinia'],
      resolvers: []
    }),
    Components({
      resolvers: []
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
