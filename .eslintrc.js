module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    REACT_APP_ENV: true,
    API_URL: true,
    hooks: true,
  },
  rules: {
    // 0 -> off
    // 1 -> warn
    // 2 -> error
    'global-require': 0, // 关闭全局引用 require
    'no-new': 0,
    'prefer-const': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'react-hooks/exhaustive-deps': 0,
    'consistent-return': 0,
    'no-nested-ternary': 0,
    'no-restricted-syntax': 0,
    'prefer-rest-params': 0,
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowDestructuring: true, // Allow `const { props, state } = this`; false by default
        allowedNames: ['self', 'context'], // Allow `const self = this`; `[]` by default
      },
    ],
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-unused-expressions': 0,
    'no-invalid-this': 0,
    '@typescript-eslint/no-invalid-this': 0,
    'no-restricted-globals': 0,
    'no-await-in-loop': 0,
  },
};
