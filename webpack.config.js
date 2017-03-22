const path = require('path');

module.exports = {
  entry: './app/assets/scripts/main.js',
  output: {
    path: path.join(__dirname, './app/temp/scripts'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
        test: /\.js?/,
        exclude: /node_modules/
      },
    ],
  },
};
