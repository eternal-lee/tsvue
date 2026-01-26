import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import legacy from '@vitejs/plugin-legacy'
import stylelint from 'vite-plugin-stylelint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import libcss from 'vite-plugin-libcss'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    host: true
  },
  plugins: [
    vue(),
    libcss(), // 将 CSS 注入到 JS 中
    dts({
      entryRoot: './lib',
      // 指定 tsconfig 文件路径
      tsconfigPath: './tsconfig.lib.json',
      // 自定义输出目录
      outDir: 'es/types'
    }),
    // legacy({
    //   targets: ['defaults', 'not IE 11', 'chrome > 52'],
    //   modernPolyfills: true
    // }),
    stylelint({
      fix: true, // 启用自动修复
      include: ['**/*.{css,scss,sass,less}'], // 指定要检查的文件类型
      exclude: ['node_modules/**', 'dist/**', 'es/**'], // 排除某些目录或文件
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
  build: {
    sourcemap: false,
    minify: true, // 开启压缩
    terserOptions: {},
    cssMinify: true,
    outDir: 'es',
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'ieterComponents',
      formats: ['iife', 'umd', 'es'],
      // the proper extensions will be added
      fileName: 'index'
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
        exports: 'named',
        assetFileNames: 'assets/[name].[ext]' // 自定义资源文件名
      }
    }
  },
  // 在构建时替换代码中的 process.env.NODE_ENV，避免浏览器运行时报错
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
