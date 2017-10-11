var path = require('path');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'game.js'
  }
};
