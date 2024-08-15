/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    require.resolve("@vercel/style-guide/eslint/typescript"),
  ],
  parserOptions: {
    project: true,
  },
  rules: {
    "@typescript-eslint/no-unsafe-argument": "off",
  },
};
