import globals from "globals";
import js from "@eslint/js";

/** @type {import('eslint').Linter.Config} */
export default {
  files: ["**/*.js"], //Apply ESLint to all JS files
  languageOptions: {
    sourceType: "commonjs", // You're using CommonJS
    globals: {
      ...globals.node, // Enables Node.js globals like `process`
    },
  },
  ...js.configs.recommended, 
};
