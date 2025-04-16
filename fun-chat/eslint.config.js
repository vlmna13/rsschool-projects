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
      reportUnusedDisableDirectives: "error",
    },
    rules: {
      "max-lines-per-function": [
        "error",
        { max: 40, skipComments: true, skipBlankLines: true },
      ],
      "@typescript-eslint/no-magic-numbers": [
        "error",
        {
          ignore: [0, 1],
          ignoreEnums: true,
          ignoreNumericLiteralTypes: true,
          ignoreReadonlyClassProperties: true,
          enforceConst: true,
        },
      ],
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        { assertionStyle: "never" },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        { accessibility: "explicit", overrides: { constructors: "off" } },
      ],
      "@typescript-eslint/member-ordering": "error",
    },
  },
];
