module.exports = {
    root: true,
    overrides: [
      {
        files: ["*.ts"],
        parserOptions: {
          project: [
            "tsconfig.*?.json",
          ],
          createDefaultProgram: true
        },
        extends: [
          "plugin:@angular-eslint/recommended",
          "plugin:prettier/recommended"
        ],
        rules: {
          "import/prefer-default-export": "off",
          "no-console": "off",
          'lines-between-class-members': [
            'error',
            'always',
            { 'exceptAfterSingleLine': true },
          ]
        }
      },
    ]
  }