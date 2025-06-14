import { FlatCompat } from '@eslint/eslintrc'
import { defineConfig } from 'eslint/config'
import eslintjs from '@eslint/js'
import jsdoc from 'eslint-plugin-jsdoc'
import pluginVue from 'eslint-plugin-vue'

const compat = new FlatCompat()

export default defineConfig([
  ...pluginVue.configs['flat/essential'],
  ...compat.extends('@vue/eslint-config-typescript/recommended'),
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module'
    },
    plugins: {
      eslintjs,
      jsdoc
    },
    extends: ['eslintjs/recommended'],
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'vue/multi-word-component-names': 'off',
      'no-console': 'off',
      'no-debugger': 'off',
      'jsdoc/check-access': 1, // Recommended
      'jsdoc/check-alignment': 1, // Recommended
      // 'jsdoc/check-examples': 1,
      'jsdoc/check-indentation': 1,
      'jsdoc/check-line-alignment': 1,
      'jsdoc/check-param-names': 1, // Recommended
      'jsdoc/check-property-names': 1, // Recommended
      'jsdoc/check-syntax': 1,
      'jsdoc/check-tag-names': 1, // Recommended
      'jsdoc/check-types': 1, // Recommended
      'jsdoc/check-values': 1, // Recommended
      'jsdoc/empty-tags': 1, // Recommended
      'jsdoc/implements-on-classes': 1, // Recommended
      // 'jsdoc/informative-docs': 1,
      // 'jsdoc/match-description': 1,
      'jsdoc/multiline-blocks': 1, // Recommended
      'jsdoc/no-bad-blocks': 1,
      'jsdoc/no-blank-block-descriptions': 1,
      'jsdoc/no-defaults': 1,
      // 'jsdoc/no-missing-syntax': 1,
      'jsdoc/no-multi-asterisks': 1, // Recommended
      // 'jsdoc/no-restricted-syntax': 1,
      'jsdoc/no-types': 'off',
      // 'jsdoc/no-undefined-types': 1, // Recommended (Off in TS)
      'jsdoc/require-asterisk-prefix': 1,
      'jsdoc/require-description': 1,
      // 'jsdoc/require-description-complete-sentence': 1,
      // 'jsdoc/require-example': 1,
      // 'jsdoc/require-file-overview': 1,
      // 'jsdoc/require-hyphen-before-param-description': 1, // 保证 @param 描述前有个 - 符号
      'jsdoc/require-jsdoc': 1, // Recommended
      'jsdoc/require-param': 1, // Recommended
      'jsdoc/require-param-description': 1, // Recommended
      'jsdoc/require-param-name': 1, // Recommended
      // 'jsdoc/require-param-type': 1, // Recommended (Off in TS)
      'jsdoc/require-property': 1, // Recommended
      'jsdoc/require-property-description': 1, // Recommended
      'jsdoc/require-property-name': 1, // Recommended
      'jsdoc/require-property-type': 1, // Recommended
      // 'jsdoc/require-returns': 1, // Recommended
      'jsdoc/require-returns-check': 1, // Recommended
      'jsdoc/require-returns-description': 1, // Recommended
      // 'jsdoc/require-returns-type': 1, // Recommended (Off in TS)
      'jsdoc/require-throws': 1,
      'jsdoc/require-yields': 1, // Recommended
      'jsdoc/require-yields-check': 1, // Recommended
      'jsdoc/sort-tags': 1,
      'jsdoc/tag-lines': 1, // Recommended
      'jsdoc/valid-types': 1 // Recommended
    }
  }
])
