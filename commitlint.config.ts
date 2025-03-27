// .commitlintrc.js
/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  formatter: '@commitlint/format',
  rule: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'ci',
        'chore',
        'docs',
        'ticket',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style'
      ]
    ]
  },
  helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
  prompt: {
    useEmoji: true,
    types: [
      { value: 'feat', name: 'feat: 新增功能 | A new feature' },
      { value: 'fix', name: 'fix: 修复缺陷 | A bug fix' },
      { value: 'docs', name: 'docs: 文档更新 | Documentation only changes' },
      { value: 'style', name: 'style: 代码格式' },
      { value: 'refactor', name: 'refactor: 代码重构' },
      { value: 'perf', name: 'perf: 性能提升 | A code change that improves performance' },
      { value: 'test', name: 'test: 测试相关 | Adding missing tests or correcting existing tests' },
      { value: 'build', name: 'build: 构建相关 ' },
      { value: 'ci', name: 'ci: 持续集成 ' },
      { value: 'revert', name: 'revert: 回退代码 | Revert to a commit' },
      { value: 'chore', name: 'chore: 其他修改' }
    ]
  }
}
