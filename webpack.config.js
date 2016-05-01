var path = require('path');

var defaults = {
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
        setImmediate: true
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    }
};

module.exports = [
    Object.assign({}, defaults, {
        entry: './src/main/index.js',
        output: {
            path: path.resolve(__dirname, 'src'),
            filename: 'main.js'
        },
        target: 'electron'
    }),
    Object.assign({}, defaults, {
        entry: './src/renderer/index.js',
        output: {
            path: path.resolve(__dirname, 'src'),
            filename: 'renderer.js'
        },
        target: 'electron-renderer'
    })
];
