const BundleTracker = require("webpack-bundle-tracker");
const path = require('path');

const prod = process.env.NODE_ENV === 'production'

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: prod ? '/static/' : "http://localhost:8060/",
  outputDir: './dist/',
  chainWebpack: config => {
    config.optimization
      .splitChunks(false)

    config
      .plugin('BundleTracker')
      .use(BundleTracker, [{filename: `./webpack-stats${prod ? '-prod' : ''}.json`}])

    config.resolve.alias
      .set('__STATIC__', 'static')

    config.devServer
      .public('http://0.0.0.0:8060')
      .host('0.0.0.0')
      .port(8060)
      .hotOnly(true)
      .watchOptions({poll: 1000})
      .https(false)
      .headers({"Access-Control-Allow-Origin": ["\*"]})
  }
}
