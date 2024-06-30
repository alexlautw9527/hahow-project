module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/jsx-runtime',
    'prettier',
    'plugin:storybook/recommended',
  ],

  // https://stackoverflow.com/questions/73915236/how-do-i-configure-eslint-to-ignore-my-root-folder-and-to-only-include-my-src-fo
  ignorePatterns: ['/*', '!/.storybook', '!/src'], // 只檢查 src 和 .storybook 底下

  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },

  // react-refresh 是 vite 預設配置
  plugins: ['react-refresh', 'prettier'],
  rules: {
    // vite 預設配置
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    // emotion css prop
    'react/no-unknown-property': ['error', { ignore: ['css'] }],

    // functional component 使用函數預設參數作為 defaultProps, 不另外定義 defaultProps
    'react/require-default-props': [
      'error',
      {
        functions: 'defaultArguments',
      },
    ],
    'import/prefer-default-export': 'off',
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true,
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],

    // redux toolkit 允許 immer 功能 mutate state
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state'],
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        // 可以引入 devDependencies 的檔案
        devDependencies: [
          '**/mocks/**',
          '**/tests/**',
          '**/.storybook/**',
          '**/*{.,_}{test,spec}.{ts,tsx}',
          '**/vitest.config.ts',
          '**/*.stories.tsx',
        ],
      },
    ],

    // 應用在 routes 資料夾
    'no-use-before-define': ['error', { functions: false, classes: false }],
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: false },
    ],

    // 用於 barrel file, 例如 index.ts
    'no-restricted-exports': [
      'error',
      { restrictDefaultExports: { defaultFrom: false } },
    ],

    // 用於 tanstack router 可以使用 throw redirect(...)
    'no-throw-literal': 'off',
    '@typescript-eslint/no-throw-literal': 'off',

    // underscore 的變數(_) 不會被檢查
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: 'tsconfig.paths.json',
      },
    },
  },
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        // ts 已強制定義 props 的型別, prop spreading 是安全的
        'react/jsx-props-no-spreading': 'off',
      },
    },
  ],
};
