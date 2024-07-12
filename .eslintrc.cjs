require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: "latest",
  },
  extends: [
    "airbnb-base",
    "plugin:vue/recommended",
    "eslint:recommended",
    "prettier",
  ],
  rules: {},
};
