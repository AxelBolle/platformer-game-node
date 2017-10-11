var path = require('path');
var webpack = require("webpack");
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
var pixi = path.join(phaserModule, 'build/custom/pixi.js')
var p2 = path.join(phaserModule, 'build/custom/p2.js')

module.exports = {
  entry: {
    app: './src/js/main.js',
    vendor: ['pixi', 'p2', 'phaser']
  },
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'game.js'
  },
  plugins: [
    new BrowserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 3005,
      proxy: 'http://localhost:3000/'
    }),
    new webpack.optimize.CommonsChunkPlugin({name:'vendor', filename:'vendor_bundle.js'})
  ],
  module: {
    rules: [
      { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') },
      { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
      { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
      { test: /p2\.js/, use: ['expose-loader?p2'] }
    ]
  },
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2
    }
  }
}
