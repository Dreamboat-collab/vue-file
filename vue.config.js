const { defineConfig } = require('@vue/cli-service')
const webpack = require("webpack");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery",
        Popper: ['popper.js', 'default']
      }),
    ],
  },
})
module.exports = {
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
          args[0].title = 'StarAirlines - Start Your Journey With Us'
          return args
        })},

  devServer:{
    port:8081,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  }
}
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 添加代理中间件
app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080', // 后端服务器地址
      changeOrigin: true,
    })
);

// 其他路由和中间件
// ...

// 监听端口
app.listen(8081, () => {
  console.log('Proxy server is running on port 8081');
});
