module.exports = {
  parser: "@typescript-eslint/parser",

  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },

  extends: ["plugin:@typescript-eslint/recommended", "prettier"],

  env: {
    node: true,
  },
};
