module.exports = {
    env: {
      browser: true,
      es6: true,
      jest: true,
    },
    extends: ["airbnb", "plugin:react/recommended", "prettier"],
    globals: {
      Atomics: "readonly",
      SharedArrayBuffer: "readonly",
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint", "prettier"],
    rules: {
      "react/jsx-filename-extension": [0],
      "import/extensions": 0,
      "jsx-a11y/anchor-is-valid": 0,
      "react/jsx-one-expression-per-line": 0,
      "react/jsx-props-no-spreading": 0,
      "@typescript-eslint/no-unused-vars": 2,
      "no-unused-vars": 0,
      "linebreak-style": 0,
      "implicit-arrow-linebreak": 0,
      "prettier/prettier": 2,
      "react/react-in-jsx-scope": "off",
      "import/no-extraneous-dependencies": [
        "warn",
      ],
      "no-use-before-define": 0,
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  };