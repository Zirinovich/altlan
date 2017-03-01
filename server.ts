require('babel-core/register');
// TODO: разобраться что это такое
/*['.css', '.less', '.sass', '.ttf', '.woff', '.woff2'].forEach((ext) => require.extensions[ext] = () => {});*/
require('babel-polyfill');
require('server.tsx');
