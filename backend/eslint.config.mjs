import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import unusedImports from "eslint-plugin-unused-imports";
import * as imp from "eslint-plugin-import";

import path from "path";
import { fileURLToPath } from "url";
// quote
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: {
      "unused-imports": unusedImports,
      import: imp,
    },
  },

  {
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "quotes": [0, "double"],
      "no-useless-rename": "error",
      "import/no-duplicates": "error",
      "import/no-namespace": "error",
      "unused-imports/no-unused-imports": "error",
    },
  },
  eslintPluginPrettier,
];
