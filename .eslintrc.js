module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  extends: [
    'airbnb-typescript/base',
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  'rules': { // 0 = off, 1 = warn, 2 = error
    'eol-last': ['error', 'always'],
    'max-len': ['warn', 300],
    'import/no-cycle': ['off'],
    'no-undef': ['off'],
    '@typescript-eslint/interface-name-prefix': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/adjacent-overload-signatures': ['error'],
    '@typescript-eslint/explicit-function-return-type': ['error'],
    '@typescript-eslint/member-delimiter-style': ['error'],
    '@typescript-eslint/no-for-in-array': ['error'],
    '@typescript-eslint/naming-convention': ['error',
      {
        'selector': 'function',
        'format': ['camelCase']
      },
    ],
    '@typescript-eslint/no-dynamic-delete': ['error'],
    '@typescript-eslint/no-misused-new': ['error'],
    '@typescript-eslint/no-throw-literal': ['error'],
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': ['error'],
    '@typescript-eslint/explicit-member-accessibility': ['error'],
    '@typescript-eslint/type-annotation-spacing': ['error', {
      'before': false,
      'after': true,
      overrides: {
        arrow: {
          before: true,
          after: true
        }
      }
    }],
    'import/no-extraneous-dependencies': ['error', { 'devDependencies': true }],
    'class-methods-use-this': ['off'],
  }
};
