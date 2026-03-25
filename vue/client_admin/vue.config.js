module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: '基于Hadoop的航班分析系统的设计与实现'
    }
  },
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
