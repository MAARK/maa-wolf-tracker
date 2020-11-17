module.exports = {
  extends: "airbnb",
  env: {
    jest: true,
  },
  globals: {
    Waypoint: true,
  },
  rules: {
    quotes: ["error", "single"],
    semi: [
      "error",
      "always",
      {
        omitLastInOneLineBlock: true,
      },
    ],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/jsx-closing-bracket-location": [1, "after-props"],
    "object-curly-newline": [
      "error",
      {
        ImportDeclaration: { multiline: true, minProperties: 4 },
        ExportDeclaration: { multiline: true, minProperties: 4 },
      },
    ],
    "object-property-newline": [0, { allowAllPropertiesOnSameLine: true }],
    "no-new": 0,
    "no-extra-boolean-cast": 0,
    "function-paren-newline": ["error", { minItems: 6 }],
    "comma-dangle": ["error", "never"],
  },
};
