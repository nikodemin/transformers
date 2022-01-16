const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        index: {
            import: './src/main/resources/static/ts/app.tsx',
            dependOn: 'shared',
        },
        api: {
            import: './src/main/resources/static/ts/api.ts',
            dependOn: 'shared',
        },
        transformers_table: {
            import: './src/main/resources/static/ts/transformers-table.tsx',
            dependOn: 'shared',
        },
        shared: 'lodash',
    },
    optimization: {
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/[name].bundle.js',
        chunkFilename: './src/main/resources/static/built/[name].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 200,
        poll: 1000
    }
};