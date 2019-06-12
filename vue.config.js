const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const productionGzipExtensions = ['js', 'css']
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  productionSourceMap: true,
  lintOnSave: process.env.NODE_ENV !== 'production',
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('mixins', resolve('src/mixins'))
      .set('views', resolve('src/views'))
      .set('router', resolve('src/router'))
      .set('store', resolve('src/store'))
      .set('services', resolve('src/services'))
  },
  configureWebpack: config => {
    if (
      process.env.NODE_ENV === 'production' ||
      process.env.NODE_ENV === 'testing'
    ) {
      // 为生产环境和测试修改配置...
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        }),
        new ParallelUglifyPlugin({
          sourceMap: true,
          uglifyJS: {
            output: {
              comments: false
            },
            compress: {
              // warnings: process.env.NODE_ENV === 'testing' ? true : false,
              // drop_debugger: process.env.NODE_ENV === 'testing' ? false : true,
              // drop_console: process.env.NODE_ENV === 'testing' ? false : true
            }
          }
        })
      )
    }
    return {
      resolve: {
        extensions: ['.js', '.vue', '.json']
        // alias: {
        //   '@': resolve('src'),
        //   assets: resolve('src/assets'),
        //   views: resolve('src/views'),
        //   components: resolve('src/components'),
        //   mixins: resolve('src/mixins'),
        //   services: resolve('src/services')
        // }
      }
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 8089,
    https: false,
    hotOnly: false,
    disableHostCheck: true,
    open: true,
    proxy: '' // string | Object
  }
}
