var path = require('path');

var publicPath = 'http://localhost:8080/public/assets';

module.exports = (IS_PRODUCTION) => {
    return {
        // если добавить параметр context: __dirname + './src'
        // то можно писать entry: './client.js', это удобно при множестве точек входа
        entry: {
            bundle: ['babel-polyfill', './src/client.tsx']
        },
        output: {
            path: path.resolve(__dirname, "../public/assets"),
            filename: IS_PRODUCTION ? "[name]-[hash].js" : "[name].js",
            publicPath
        }
    }
};