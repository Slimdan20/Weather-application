import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import prettierPlugin from 'eslint-plugin-prettier'

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs}'],
        languageOptions: {
            globals: globals.browser,
        },
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            eqeqeq: 'error',
            'no-var': 'error',
            'prefer-const': 'warn',
            'no-global-assign': 'error',
            'no-param-reassign': 'warn',
            complexity: ['warn', { max: 16 }],
            curly: 'error',
            'no-debugger': 'error',
        },
    },
])
