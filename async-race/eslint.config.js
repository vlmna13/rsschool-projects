import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      unicorn: eslintPluginUnicorn,
    },
    settings: {
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
      "@typescript-eslint/strict-bind-call-apply": "error",
      noInlineConfig: "error",
      reportUnusedDisableDirectives: "error",
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
      "class-methods-use-this": "error",
      "unicorn/recommended": "error",
    },
  },
];
