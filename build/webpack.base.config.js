const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const rootDir = process.cwd(); // 当前node命令执行时所在的文件夹目录 __dirname是指被执行js文件所在目录的绝对路径

module.exports = {
  entry: {
    index: './src/main.tsx',
  },
  output: {
    filename: 'js/entry_[name]_[contenthash:8].js', // 是入口文件entry打包时，对应输出文件名配置
    chunkFilename: 'js/[name]_[contenthash:8].js', // 非入口(non-entry) chunk 文件的名称
    path: path.resolve(process.cwd(), 'dist'),
  },
  resolve: {
    // fallback: {
    //   http: require.resolve("stream-http"),
    //   stream: require.resolve('stream-browserify'),
    //   https: require.resolve("https-browserify"),
    //   util: require.resolve('util/'),
    //    assert: require.resolve('assert/'),
    // },
    alias: {
      '@': path.resolve('src'),
      // '@ant-design/icons/lib/dist$': path.resolve(rootDir,'src/utils/antdIcon.tsx')
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(rootDir, 'src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // es6 转换成 es5  thread-loader//多线程打包
          // options: {
          //   presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          // },
        },
      },
      {
        test: /\.(png|jpg|svg|gif|webp)$/,
        type: 'asset',
        include: path.resolve(__dirname, '../src'),
        generator: {
          filename: 'assets/[hash:8].[name][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 30 * 1024, // 小于30KB才采用base64编码
          },
        },
      },
      {
        test: /\.(ttf|svg|eot|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[hash:8].[name][ext]',
        },
      },
      {
        test: /\.txt$/,
        type: 'asset/source',
      },
    ],
  },
  stats: 'errors-warnings',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '*.js',
          context: path.resolve(rootDir, 'public/static'),
          to: path.resolve(rootDir, 'dist/static'),
        },
      ],
    }),
    // 配置 eslint
    // new ESLintPlugin(),
    // 自动加载react模块 针对旧的转换 不用在顶部频繁引入 react
    // new webpack.ProvidePlugin({
    //   React: "react"
    // })
  ],
};
