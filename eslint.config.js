import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintReact from "eslint-plugin-react";
import eslintReactHooks from "eslint-plugin-react-hooks";
import eslintReactRefresh from "eslint-plugin-react-refresh";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: eslintReact,
      "react-hooks": eslintReactHooks,
      "react-refresh": eslintReactRefresh,
      prettier: prettierPlugin,
    },
    ignores: ["dist", "node_modules", "coverage", "eslint.config.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
      },
      parserOptions: {
        project: ["tsconfig.json", "tsconfig.node.json"],
      },
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "prefer-const": "error",
      "no-console": "error",
      "react/jsx-curly-brace-presence": ["warn", { props: "never", children: "never" }],
      "react/function-component-definition": ["error", { namedComponents: "arrow-function" }],
      "react/self-closing-comp": ["error", { component: true, html: true }],
      "max-params": ["error", 3],
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
];

export default eslintConfig;
