var webpack = require("webpack");
var path = require("path");
var router = require('react-router');


var config = {
    entry: [ "./src/index.js"],
    output: {
        path: __dirname,
        filename: "bundle.js",
        publicPath: "/"
    },
    resolve: {
        extensions: ['.js', '.jsx'] 
    
    },
    module: {
        rules: [
            {
                test: /\.js?/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: [  {
                              'plugins': ['@babel/plugin-proposal-class-properties']}]
                }

            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(ttf|jpg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            },
        ]
    }
};
module.exports = config;