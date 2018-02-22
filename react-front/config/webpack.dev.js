const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devServer: {
        contentBase: path.join(__dirname, '../public'),
        port: 3000,
        proxy: {
            '/api/**': {
                target: 'http://localhost:8080/',
                secure: false,
                changeOrigin: true,
            },
        },
    },
});
