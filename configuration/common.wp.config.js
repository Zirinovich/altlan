global.Promise = require('bluebird');

var webpack = require('webpack');
var path = require('path'); // node.js core-модуль для работы с путями операционной системы
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

const IS_PRODUCTION = (process.env.NODE_ENV === 'production');
const IS_SERVER = (process.env.NODE_EXEC_ENV === 'server');

var plugins = [
    new webpack.LoaderOptionsPlugin({debug: !IS_PRODUCTION}),
    new webpack.DefinePlugin({
        'process.env': {
            BROWSER: JSON.stringify(true),
            NODE_ENV: JSON.stringify(IS_PRODUCTION ? 'production' : 'development'),
            NODE_EXEC_ENV: JSON.stringify(process.env.NODE_EXEC_ENV || 'server')
        }
    }),
    new ExtractTextPlugin(IS_PRODUCTION ? 'styles-[hash].css' : 'styles.css'),
    new webpack.ProvidePlugin({
        $: 'jquery',
        _: 'lodash'
    })
];

if (IS_PRODUCTION) {
    plugins.push(
        new CleanWebpackPlugin(['public/assets/'], {
            root: path.resolve(__dirname, "../"),
            verbose: true,
            dry: false
        })
    );
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
}

const config = (IS_SERVER ? require('./server.wp.config') : require('./client.wp.config'))(IS_PRODUCTION);

module.exports = {
    entry: config.entry,
    output: config.output,
    externals: config.externals,
    resolve: {  // настройки того, где webpack будет искать модули
        modules: [
            path.resolve(__dirname, "../src"),
            "node_modules"
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
        /*,
         alias:{
         redux: __dirname+"/src/redux"
         }*/
    }
    ,
    plugins,
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
            {test: /\.tsx?$/, loader: ['babel-loader', 'awesome-typescript-loader']},
            {test: /\.jsx?$/, loader: 'babel-loader', exclude: [/node_modules/, /public/]},
            {test: /\.json$/, loader: 'json-loader'},
        ]
    }
    ,
    devtool: !IS_PRODUCTION ? 'cheap-inline-module-source-map' : false,
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
}
;
