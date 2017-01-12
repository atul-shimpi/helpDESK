var webpack = require('webpack');
var htmlPlugin = require('html-webpack-plugin');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');

module.exports = {
  context: __dirname,
  postcss: [autoprefixer],
  entry: {	  
    app: './src/app.js',
    vendor: './src/vendor.js'
  },	 
  output: {
    path: './public',
    filename: '/js/[name].js'
  },	
  module: {
    loaders: [ {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },{
       test: /\.scss/,
       loader: ExtractTextPlugin.extract('css!sass')
    },{ 
	   test: /\.css$/, 
	   loader: 'style-loader!css-loader' 
    },{
        test: /\.(woff2?|ttf|eot|svg)$/,
        loader: 'url?limit=10000'
    },{
        test: /bootstrap\/dist\/js\/umd\//,
        loader: 'imports?jQuery=jquery'
    },{ 
		test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
		loader: "file" 
	},{ test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/
, loader: 'url?limit=100000&name=[name].[ext]'
},{ 
		test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
		loader: "url?limit=10000&mimetype=image/svg+xml"
	}]
  },
  plugins: [
    new htmlPlugin({
      template: 'src/index.html'
    }),
    new ExtractTextPlugin('styles/styles.css', {
      allChunks: true
    })
  ],	
  devServer: {
    port: 3000
  },
  resolve: {
    root: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
    extensions: ['', '.js', '.css', 'scss']
  }
};