const path = require('path');

const pathResolve = (pathUrl) => path.join(__dirname, pathUrl);

module.exports = {
  webpack: {
    alias: {
      '@': pathResolve('src'),
      // 此处是一个示例，实际可根据各自需求配置
    },
  },
  babel: {
    plugins: [
      ['import', { libraryName: 'antd', style: true }],
      ['@babel/plugin-proposal-decorators', { legacy: true }],
    ],
  },
  plugins: [
    {
      plugin:  require("craco-less"),
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              'primary-color': '#f18101',
              'link-color': '#f18101',
            },
            javascriptEnabled: true,
          }
        }
      }
    },
    {
      plugin: require('craco-plugin-scoped-css'),
    },
  ],
};
