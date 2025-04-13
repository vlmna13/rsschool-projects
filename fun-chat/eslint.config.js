import eslintPluginTypeScript from "@typescript-eslint/eslint-plugin";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts", "**/*.js"],
    ignores: [
      "node_modules",
      "dist",
      "*.config.js",
      "*.config.cjs",
      "*.config.mjs",
      "*.json",
    ],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": eslintPluginTypeScript,
      unicorn: eslintPluginUnicorn,
    },
    linterOptions: {
      noInlineConfig: true,
    },
    rules: {
      "max-lines-per-function": [
        "error",
        { max: 40, skipComments: true, skipBlankLines: true },
      ],
    },
  },
];
