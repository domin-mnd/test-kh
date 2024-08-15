/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@repo/eslint-config/vue.js"],
  settings: {
    "import/core-modules": ["vue-router/auto-routes"],
  },
  overrides: [
    {
      files: ["src/pages/**/*.vue"],
      rules: {
        "vue/multi-word-component-names": 0,
      },
    },
  ],
  env: {
    node: true,
  },
};
