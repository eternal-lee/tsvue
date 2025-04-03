import { defineConfig } from 'eslint/config'
import js from '@eslint/js'

export default defineConfig([
  {
    files: ['**/*.js'],
    plugins: {
      js
    },
    extends: ['js/recommended'],
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'vue/multi-word-component-names': 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
  }
])
