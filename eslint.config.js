export default [
  {
    ignores: [
      "node_modules",
      "dist",
      "build",
      ".sfdx",
      ".vscode"
    ],
  },
  {
    files: ["force-app/**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
      "no-console": "off"
    }
  }
];
