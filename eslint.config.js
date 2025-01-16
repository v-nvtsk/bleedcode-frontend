import eslint from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import stylistic from '@stylistic/eslint-plugin';
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript';
import pluginVitest from '@vitest/eslint-plugin';
import tseslint from 'typescript-eslint';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '.vite/**'],
  },

  ...tseslint.config(
    {extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
    ]}),

  ...defineConfigWithVueTs(
    pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,
  ),

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  {
    name: 'app/basic-rules',
    files: ['**/*.{js,ts,mts,tsx}'],
    rules: {indent: ["error", 2],}
  },

  {
    name: 'app/extended-rules',
    files: ['**/*.{js,ts,mts,tsx,vue}'],
    plugins: {'@stylistic': stylistic,},
    rules: {
      "arrow-spacing": ["error", {
        "before": true,
        "after": true
      }],
      "curly": ["error"],
      'computed-property-spacing': ["error", "never"],
      "no-whitespace-before-property": "error",
      "no-console": ["error", {"allow": ["warn", "error"]}],
      "space-in-parens": ["error", "never"],
      "@stylistic/space-infix-ops": "error",
      "@stylistic/arrow-spacing": "error",
      "@stylistic/object-curly-newline": ["error", {"minProperties": 2}],
      "@stylistic/object-property-newline": "error",
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/object-curly-spacing": ["error", "never"],
      "@stylistic/space-before-function-paren": ["error", {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "always",
      }],
      "@stylistic/semi": "error",
      "@stylistic/no-extra-semi": "error",
      "@stylistic/semi-spacing": ["error", {
        "before": false,
        "after": true
      }],
      "@stylistic/key-spacing": ["error", {
        "beforeColon": false,
        "afterColon": true,
      }],
      "@stylistic/no-trailing-spaces": ["error", {
        "skipBlankLines": true,
        "ignoreComments": true
      }],
      "@stylistic/no-multi-spaces": ["error", {ignoreEOLComments: true}],
      "@stylistic/newline-per-chained-call": ["error", {"ignoreChainWithDepth": 2}],
      "@stylistic/lines-between-class-members": ["error", "always"],
      "@stylistic/no-multiple-empty-lines": ["error", {
        "max": 1,
        "maxBOF": 0,
        "maxEOF": 0
      }],
      "@stylistic/comma-spacing": ["error", {
        "before": false,
        "after": true
      }],
      "@stylistic/padding-line-between-statements": [
        "error",
        {
          blankLine: "never",
          prev: "*",
          next: "*"
        },
        //
        {
          blankLine: "always",
          prev: "*",
          next: "function"
        },
        //
        {
          blankLine: "always",
          prev: "*",
          next: "return"
        },

        //
        {
          blankLine: "always",
          prev: "*",
          next: ["const", "let", "var"]
        },
        {
          blankLine: "always",
          prev: ["const", "let", "var"],
          next: "*"
        },
        {
          blankLine: "never",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"]
        },
        //
        {
          blankLine: "always",
          prev: "import",
          next: "*"
        },
        {
          blankLine: "never",
          prev: "import",
          next: "import"
        },
        //
        {
          blankLine: "always",
          prev: "*",
          next: "export"
        },
        {
          blankLine: "never",
          prev: "export",
          next: "export"
        },

      ],
      "vue/object-curly-spacing": ["error", "always"],
      "vue/block-tag-newline": ["error", {
        "singleline": "always",
        "multiline": "always",
        "maxEmptyLines": 0,
        "blocks": {
          "template": {
            "singleline": "always",
            "multiline": "always",
            "maxEmptyLines": 0,
          },
          "script": {
            "singleline": "always",
            "multiline": "always",
            "maxEmptyLines": 0,
          },
        }
      }],
      "vue/script-indent": ["error", 2, {
        "baseIndent": 1,
        "switchCase": 1,
        "ignores": []
      }],
      "vue/html-indent": ["error", 2, {
        "attribute": 1,
        "baseIndent": 1,
        "closeBracket": 0,
        "alignAttributesVertically": true,
        "ignores": []
      }],
      "vue/no-multi-spaces": ["error", {"ignoreProperties": false}],
      "@stylistic/type-annotation-spacing": "error",
      "vue/multi-word-component-names": ["error", {"ignores": ['tabs']}],
    },
  },
];
