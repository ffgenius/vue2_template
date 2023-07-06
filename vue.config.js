const { defineConfig } = require('@vue/cli-service')

const port = process.env.port || process.env.npm_config_port || 80 // 端口
const baseApi = process.env.VUE_APP_BASE_API
const title = process.env.VUE_APP_TITLE || 'vue.js app'

module.exports = defineConfig({

  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
  outputDir: 'dist',
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'static',

  transpileDependencies: true,

  // webpack-dev-server 相关配置
  devServer: {
    host: '0.0.0.0',
    port: port,
    open: true,
    proxy: {
      [baseApi]: {
        target: 'http://192.168.3.107:8080',
        changeOrigin: true,
        pathRewrite: {
          ['^' + baseApi]: ''
        }
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        // 配置网页标题
        args[0].title = title
        return args
      })
  }
})
