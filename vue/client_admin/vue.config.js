module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8081,
    open: false,
    proxy: {
      '/api': {
        target: 'http://server:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}
