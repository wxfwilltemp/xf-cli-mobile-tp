module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: ['> 0.5%', 'last 5 versions'],
    }),
    require('postcss-pxtorem')({
      rootValue: 75, //设计图给的375的图就写37.5，也就是1rem=37.5px
      selectorBlackList: ['.in-'], // 要忽略的选择器并保留为px。
      propList: ['*'], // 可以从px更改为rem的属性
      exclude: /(node_modules)/i, // 排除某一个文件夹不转换 rem
    }),
  ],
};
