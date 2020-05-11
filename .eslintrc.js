module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'google',
    'plugin:import/warnings',
    'plugin:import/errors',
    'plugin:import/typescript',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'require-jsdoc': 'off',
    'new-cap': 'off',
    'object-curly-spacing': [0, 'always'],
    indent: ['error', 2],
    'arrow-parens': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'external',
          'internal',
          'index',
          'parent',
          'sibling',
          'builtin',
        ],
      },
    ],
  },
};
