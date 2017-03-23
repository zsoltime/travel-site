const path = require('path');

module.exports = {
  entry: {
    main: './app/assets/scripts/main.js',
    vendor: './app/assets/scripts/vendor.js',
  },
  output: {
    path: path.join(__dirname, './app/temp/scripts'),
    filename: '[name].js'
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
