/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@repo/eslint-config/vue.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
