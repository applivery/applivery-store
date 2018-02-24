const webpack = require('webpack')

module.exports = {
  port: 4040,
  html: {
    template: './src/index.html',
  },
  entry: './src/main.js',
  presets: [
    require('poi-preset-bundle-report')(),
    require('poi-preset-yaml')(),
    // require('poi-preset-sw-precache')(),
    require('poi-preset-eslint')({ mode: '*' }),
  ],
  devServer: {
    proxy: {
      '/api': {
        target: 'https://dashboard.applivery.com/api',
        changeOrigin: true,
        pathRewrite: { '^/api': '/' },
      },
    },
  },
  extendWebpack(config) {
    config.plugin('package-version').use(webpack.DefinePlugin, [
      {
        'process.env.VERSION': JSON.stringify(require('./package.json').version),
      },
    ])
  },
}
