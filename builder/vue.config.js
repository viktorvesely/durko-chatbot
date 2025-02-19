module.exports = {
  outputDir: "C:/Users/Viktor/Documents/gjh-chatbot/builder",
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
  devServer: {
    proxy: 'http://localhost:1337',
  }
};