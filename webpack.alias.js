const path = require('path');

// 由于roadhog的webpack不是用对象导出的
// 所以无法兼容eslint-import-resolver-webpack的配置
// 立此配置用于补充
// https://www.npmjs.com/package/eslint-import-resolver-webpack
module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      docs: path.resolve(__dirname, './docs/src/index.ts'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};