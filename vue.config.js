const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false
})
module.exports = {
  devServer:{
    port:8081,
  },
}