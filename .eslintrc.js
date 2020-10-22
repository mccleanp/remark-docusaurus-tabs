module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
};
