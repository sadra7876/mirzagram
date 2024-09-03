import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import unusedImports from "eslint-plugin-unused-imports";
import imp from "eslint-plugin-import";

export default [
  { files: ["src/**/*.{js,mjs,cjs,ts}"] },
  { files: ["src/**/*.js"], languageOptions: { sourceType: "commonjs" } },
  {
    plugins: {
      "unused-imports": unusedImports,
      import: imp,
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  {
    rules: {
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
      quotes: [1, "double"],
      "@typescript-eslint/no-unused-vars": "warn",
      "no-useless-rename": "error",
      "import/no-duplicates": "error",
      "import/no-namespace": "error",
      "unused-imports/no-unused-imports": "error",

      // by Microsoft
      "dot-notation": "error",
      eqeqeq: "error",
      "no-caller": "error",
      "no-constant-condition": ["error", { checkLoops: false }],
      "no-eval": "error",
      "no-extra-bind": "error",
      "no-new-func": "error",
      "no-new-wrappers": "error",
      "no-return-await": "error",
      "no-template-curly-in-string": "error",
      "no-throw-literal": "error",
      "no-undef-init": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-const": "error",
      "prefer-object-spread": "error",
      "unicode-bom": ["error", "never"],
      // --
      "no-extra-boolean-cast": "off",
      "no-case-declarations": "off",
      "no-cond-assign": "off",
      "no-control-regex": "off",
      "no-inner-declarations": "off",

      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "typeLike",
          format: ["PascalCase"],
          filter: { regex: "^(__String|[A-Za-z]+_[A-Za-z]+)$", match: false },
        },
        // { selector: "interface", format: ["PascalCase"], custom: { regex: "^I[A-Z]", match: false }, filter: { regex: "^I(Arguments|TextWriter|O([A-Z][a-z]+[A-Za-z]*)?)$", match: false } },
        {
          selector: "variable",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
          filter: {
            regex: "^(_{1,2}filename|_{1,2}dirname|_+|[A-Za-z]+_[A-Za-z]+)$",
            match: false,
          },
        },
        {
          selector: "function",
          format: ["camelCase", "PascalCase"],
          leadingUnderscore: "allow",
          filter: { regex: "^[A-Za-z]+_[A-Za-z]+$", match: false },
        },
        {
          selector: "parameter",
          format: ["camelCase"],
          leadingUnderscore: "allow",
          filter: { regex: "^(_+|[A-Za-z]+_[A-Z][a-z]+)$", match: false },
        },
        {
          selector: "method",
          format: ["camelCase", "PascalCase"],
          leadingUnderscore: "allow",
          filter: { regex: "^([0-9]+|[A-Za-z]+_[A-Za-z]+)$", match: false },
        },
        {
          selector: "memberLike",
          format: ["camelCase"],
          leadingUnderscore: "allow",
          filter: { regex: "^([0-9]+|[A-Za-z]+_[A-Za-z]+)$", match: false },
        },
        {
          selector: "enumMember",
          format: ["camelCase", "PascalCase"],
          leadingUnderscore: "allow",
          filter: { regex: "^[A-Za-z]+_[A-Za-z]+$", match: false },
        },

        { selector: "property", format: null },
      ],
      "@typescript-eslint/unified-signatures": "error",
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": [
        "error",
        { allowTernary: true },
      ],

      // Rules enabled in typescript-eslint configs that are not applicable here

      // added by me
      "@typescript-eslint/consistent-type-definitions": "off",

      // added by microsoft
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/class-literal-property-style": "off",
      "@typescript-eslint/consistent-indexed-object-style": "off",
      "@typescript-eslint/no-duplicate-enum-values": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off", // {} is a totally useful and valid type.
      "@typescript-eslint/no-require-imports": "off",

      // --
      "@typescript-eslint/no-inferrable-types": "off",
      // Pending https://github.com/typescript-eslint/typescript-eslint/issues/4820
      "@typescript-eslint/prefer-optional-chain": "off",
    },
  },
  eslintPluginPrettier,
];
