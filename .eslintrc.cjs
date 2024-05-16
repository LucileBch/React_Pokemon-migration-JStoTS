module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "react-app",
    "plugin:perfectionist/recommended-alphabetical",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh", "perfectionist"],
  rules: {
    "perfectionist/sort-interfaces": "error",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/no-unescaped-entities": 0,
    "react/prop-types": "off",
  },
  settings: { react: { version: "18.2" } },
};
