module.exports = {
  env: {
    browser: true,
    mocha: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    "plugin:wdio/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 9,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'wdio',
  ],
  globals: {
    $: 'readonly',
  },
  rules: {
    "class-methods-use-this": 0,
  },
};
