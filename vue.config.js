const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
        '/api': {
            target: 'http://ashuai.work:10000', // api接口基础路径
            changeOrigin: true, // 是否支持跨域
            pathRewrite: { '^/api': '' },
        },
    },
},
})
