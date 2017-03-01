var fs = require('fs');
var path = require('path');
var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = (IS_PRODUCTION) => {
    return {
        // если добавить параметр context: __dirname + './src'
        // то можно писать entry: './client.js', это удобно при множестве точек входа
        entry: {
            server: ['./server.ts']
        },
        output: {
            path: path.resolve(__dirname, "../public/assets"),
            filename: `../${IS_PRODUCTION ? "[name]-[hash]" : "[name]"}.js`,
            publicPath: '/public/',
            libraryTarget: 'commonjs2'
        },
        externals: nodeModules
    }
};