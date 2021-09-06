const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const WebpackBar = require('webpackbar');
const webpack = require('webpack');
// 分析打包大小
const BundleAnalyzerPplugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'production',
  output: {
    clean: true, // 清除打包产物
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // 采用css modules的解析方式时，排除对node_modules文件处理
        // exclude: [/node_modules/],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
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
      // 解决使用css modules时antd样式不生效
      // {
      //   test: /\.css$/,
      //   // 排除业务模块，其他模块都不采用css modules方式解析
      //   exclude: [/src/],
      //   use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }],
      // },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
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
          //   "less-loader",
          { loader: 'less-loader', options: { lessOptions: { javascriptEnabled: true } } },
        ],
      },
    ],
  },
  optimization: {
    usedExports: true,
    // 开启代码压缩
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        extractComments: false, // 不将注释提取到单独的文件中 即不生成 LICENSE.txt 文件
        terserOptions: {
          compress: {
            warnings: true,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log', 'console.table'], // 删除console
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    // 此设置保证有新增的入口文件时,原有缓存的chunk文件仍然可用
    moduleIds: 'deterministic',
    // 值为"single"会创建一个在所有生成chunk之间共享的运行时文件
    runtimeChunk: 'single',
    splitChunks: {
      // 设置为all, chunk可以在异步和非异步chunk之间共享。
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  performance: {
    hints: 'warning',
    // 入口起点的最大体积 整数类型（以字节为单位）
    maxEntrypointSize: 50000000,
    // 生成文件的最大体积 整数类型（以字节为单位 300k）
    maxAssetSize: 30000000,
    // 只给出 js 文件的性能提示
    assetFilter(assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    },
  },
  cache: {
    // 开启缓存, 将缓存类型设置为文件系统,默认是memory
    type: 'filesystem',
    // cacheDirectory 默认路径是 node_modules/.cache/webpack
    // cacheDirectory: path.resolve(__dirname, './temp_cache'), //本地目录
    buildDependencies: {
      // 更改配置文件时，重新缓存
      config: [__filename],
    },
    allowCollectingMemory: true,
    profile: true,
  },
  plugins: [
    // new CleanWebpackPlugin(),
    // 添加进度条
    new WebpackBar({ profile: true }),
    new HtmlWebpackPlugin({
      title: '广州市人民检察院网上检察院',
      filename: 'index.html',
      template: './public/index.html',
      favicon: './public/favicon.ico',
      minify: {
        // 压缩HTML文件
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true, // 压缩内联css
      },
      cdn: {
        css: [],
        js: [
          'https://cdn.bootcdn.net/ajax/libs/react/17.0.2/umd/react.production.min.js',
          'https://cdn.bootcdn.net/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js',
        ],
      },
      cache: true,
    }),
    // 单独提取css 文件
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:6].css',
    }),
    // 定义全局变量
    new webpack.DefinePlugin({
      'process.env.BASE_URL': JSON.stringify('/'),
      'process.env.API_URI': JSON.stringify('https://upiptest.hcfdev.cn/kwy'),
    }),
    // 分析打包大小
    new BundleAnalyzerPplugin(),
  ],
  // externalsType: 'script',
  // externals: {
  //   react: ['https://cdn.bootcdn.net/ajax/libs/react/17.0.2/umd/react.production.min.js', 'React'],
  //   'react-dom': ['https://cdn.bootcdn.net/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js', 'ReactDOM'],
  // },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
