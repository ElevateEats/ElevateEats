import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        plugins: { js },
        extends: ['js/recommended'],
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        languageOptions: { globals: { ...globals.browser, ...globals.node } },
    },
    pluginReact.configs.flat.recommended,
    {
        rules: {
            'no-unused-vars': 'warn',
            'arrow-body-style': ['error', 'always'],
        },
    },
]);
