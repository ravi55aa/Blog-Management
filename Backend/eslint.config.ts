import tseslint from 'typescript-eslint';
import parser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import security from 'eslint-plugin-security';

export default [
    {
        ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
    },

    {
        files: ['**/*.ts'],

        languageOptions: {
            parser,
            parserOptions: {
                project: './tsconfig.json',
                sourceType: 'module',
                ecmaVersion: 'latest',
            },
        },

        plugins: {
            '@typescript-eslint': tseslint.plugin,
            import: importPlugin,
            security,
        },

        rules: {
            /* ======================
                TYPESCRIPT
            ====================== */

            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],

            '@typescript-eslint/no-explicit-any': 'warn',

            '@typescript-eslint/no-empty-function': 'error',

            '@typescript-eslint/consistent-type-imports': 'error',

            '@typescript-eslint/no-non-null-assertion': 'warn',

            '@typescript-eslint/no-floating-promises': 'error',

            '@typescript-eslint/await-thenable': 'error',

            '@typescript-eslint/no-misused-promises': 'error',

            /* ======================
                IMPORTS
            ====================== */

            // "import/order": [
            //     "error",
            //     {
            //         groups: [
            //             "builtin",
            //             "external",
            //             "internal",
            //             "parent",
            //             "sibling",
            //             "index",
            //         ],

            //         "newlines-between": "always",

            //         alphabetize: {
            //             order: "asc",
            //         },
            //     },
            // ],

            'import/no-duplicates': 'error',

            /* ======================
                CODE QUALITY
            ====================== */

            'no-console': [
                'warn',
                {
                    allow: ['warn', 'error'],
                },
            ],

            eqeqeq: ['error', 'always'],

            curly: 'error',

            'no-var': 'error',

            'prefer-const': 'error',

            'object-shorthand': 'error',

            /* ======================
                SECURITY
                ====================== */

            'security/detect-object-injection': 'warn',

            /* ======================
                STYLE
            ====================== */

            'no-trailing-spaces': 'error',

            'eol-last': 'error',
        },
    },

    prettier,
];
