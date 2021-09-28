const path = require('path');
const webpack = require('webpack');
const HtmlWebapckPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');

const rootDir = process.cwd();
const PORT = 1028;

module.exports = {
  mode: 'development',
  output: {
    publicPath: '/',
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    // static: path.resolve(__dirname, '../public'), // static静态资源的跟目录，即不受webpack控制的资源文件，放这里
    hot: true, // / 开启 HMR 特性，如果资源不支持 HMR 会 fallback 到 live reloading
    open: true,
    port: PORT,
    // historyApiFallback: true,
    historyApiFallback: {
      rewrites: [{ from: /.*/, to: path.posix.join('/', 'index.html') }],
    },
    proxy: {
      '/api': {
        target: 'http://172.16.121.19:8873',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
      '/net': {
        target: 'https://upiptest.hcfdev.cn/kwy',
        changeOrigin: true,
        pathRewrite: { '^/net': '/net' },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // 采用css modules的解析方式时，排除对node_modules文件处理
        // exclude: [/node_modules/],
        use: [
          'style-loader',
          'css-loader',
          // {
          //   loader: 'css-loader',
          //   options: {
          //     // importLoaders: 1,
          //     modules: {
          //       mode: 'local',
          //       localIdentName: '[name]__[local]__[hash:base64:5]',
          //     },
          //   },
          // },
          'postcss-loader',
        ],
      },
      // // 解决使用css modules时antd样式不生效
      // {
      //   test: /\.css$/,
      //   // 排除业务模块，其他模块都不采用css modules方式解析
      //   exclude: [/src/],
      //   use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }],
      // },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          // 'less-loader',
          { loader: 'less-loader', options: { lessOptions: { javascriptEnabled: true } } },
        ],
      },
    ],
  },
  plugins: [
    // HMR 特性所需要的插件
    new webpack.HotModuleReplacementPlugin(),
    // 添加进度条
    new WebpackBar({ profile: true }),
    new HtmlWebapckPlugin({
      title: 'xf-cli',
      template: './public/index.html',
      cdn: {
        css: [],
        js: [],
      },
    }),
    // 配置打包的友好提示
    new FriendlyErrorsPlugin({
      // 成功的时候输出
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://localhost:${PORT}`],
      },
      // 是否每次都清空控制台
      clearConsole: true,
      onErrors: (severity, errors) => {
        // 系统级桌面提示
        notifier.notify({
          title: 'webpack 编译失败了~',
          message: `${severity} ${errors[0].name}`,
          subtitle: errors[0].file || '',
          icon: path.resolve(rootDir, 'favicon.ico'),
        });
      },
    }),
    new webpack.DefinePlugin({
      'process.env.BASE_URL': JSON.stringify('/'),
      'process.env.API_URI': JSON.stringify('/'),
    }),
  ],
};
