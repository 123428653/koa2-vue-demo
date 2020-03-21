module.exports = {
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    proxy: { // 配置多个代理
      '/home': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        ws: true
      }
    }
  }
}
