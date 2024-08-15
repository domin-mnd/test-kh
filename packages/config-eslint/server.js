const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  extends: [
    "@vercel/style-guide/eslint/node",
    "@vercel/style-guide/eslint/typescript",
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  env: {
    node: true,
    es6: true,
  },
  plugins: ["only-warn"],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  overrides: [
    {
      files: ["**/__tests__/**/*"],
      env: {
        jest: true,
      },
    },
    {
      files: ["**/routes/**/*"],
      rules: {
        "tsdoc/syntax": "off",
      },
    },
  ],
  ignorePatterns: [".*.js", "node_modules/", "dist/"],
  rules: {
    "import/no-extraneous-dependencies": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "import/no-default-export": "off",
  },
};
