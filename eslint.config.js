import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: "./tsconfig.eslint.json",
        tsconfigRootDir: dirname(fileURLToPath(import.meta.url)),
      },
    },
    plugins: {
      react
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // TypeScript strictness
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      // React strictness
      'react/prop-types': 'error', // Using TypeScript for props
      'react/jsx-boolean-value': ['warn', 'always'],
      'react/jsx-no-useless-fragment': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
]);
