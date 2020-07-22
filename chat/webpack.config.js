const path = require('path');

module.exports = {
    entry: {
        app: "./src/index.js"
    },
    output: {
        filename: 'chat.bundle.js',
        path: path.resolve(__dirname, '../../gjh-chatbot/chat'),
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
        ],
    },
    resolve: {
        alias: {
          'vue': 'vue/dist/vue.min.js'
        }
    }
};