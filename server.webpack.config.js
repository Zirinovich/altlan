global.Promise = require('bluebird');
var fs = require('fs');
var webpack = require('webpack');
var path = require('path'); // node.js core-модуль для работы с путями операционной системы
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var publicPath = 'http://localhost:8080/public/assets';
var cssName = process.env.NODE_ENV === 'production' ? 'styles-[hash].css' : 'styles.css';

const IS_PRODUCTION = (process.env.NODE_ENV === 'production');

var plugins = [
    new webpack.LoaderOptionsPlugin({debug: !IS_PRODUCTION}),
    new webpack.DefinePlugin({
        'process.env': {
            BROWSER: JSON.stringify(true),
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }
    }),
    new ExtractTextPlugin(cssName),
    new webpack.ProvidePlugin({
        $: 'jquery',
        _: 'lodash'
    })
];

if (IS_PRODUCTION) {
    plugins.push(
        new CleanWebpackPlugin(['public/assets/'], {
            root: __dirname,
            verbose: true,
            dry: false
        })
    );
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
}

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    externals: nodeModules,
    target: 'node',
    // если добавить параметр context: __dirname + './src'
    // то можно писать entry: './client.js', это удобно при множестве точек входа
    entry: {
        /*bundle: ['babel-polyfill', './src/client.js'],*/
        server: ['./server.js']
    },
    resolve: {  // настройки того, где webpack будет искать модули
        modules: [
            path.join(__dirname, 'src'),
            "node_modules"
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx']/*,
         alias:{
         redux: __dirname+"/src/redux"
         }*/
    },
    plugins,
    output: {
        path: `${__dirname}/public/assets/`,
        filename: '../server.js',
        publicPath: '/public/',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!postcss-loader'})
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!postcss-loader!less-loader'
                })
            },
            {test: /\.gif$/, loader: 'url-loader?limit=10000&mimetype=image/gif'},
            {test: /\.jpg$/, loader: 'url-loader?limit=10000&mimetype=image/jpg'},
            {test: /\.png$/, loader: 'url-loader?limit=10000&mimetype=image/png'},
            {test: /\.svg/, loader: 'url-loader?limit=26000&mimetype=image/svg+xml'},
            {test: /\.(woff|woff2|ttf|eot)/, loader: 'url-loader?limit=1'},
            {test: /\.tsx?$/, loader: ['babel-loader', 'awesome-typescript-loader'], exclude: [/node_modules/, /public/]},
            {test: /\.jsx?$/, loader: 'babel-loader', exclude: [/node_modules/, /public/]},
            {test: /\.json$/, loader: 'json-loader'},
        ]
    },
    devtool: !IS_PRODUCTION ? 'source-map' : false,
    devServer: {
        headers: {'Access-Control-Allow-Origin': '*'}
    }
};
