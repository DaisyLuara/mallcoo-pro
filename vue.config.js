const CompressionWebpackPlugin = require('compression-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const productionGzipExtensions = ['js', 'css']

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  productionSourceMap: true,
  lintOnSave: process.env.NODE_ENV !== 'production',
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
              // warnings: process.env.NODE_ENV === 'testing',
              // drop_debugger: process.env.NODE_ENV === 'testing',
              // drop_console: process.env.NODE_ENV === 'testing'
            }
          }
        })
      )
    }
  },
  css: {
    loaderOptions: {
      css: {
        localIdentName: '[name]-[hash]',
        camelCase: 'only'
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
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: []
    }
  }
}
