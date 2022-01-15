var path = require('path');

module.exports = {
    entry: {
      index: {
        import: './src/main/resources/static/ts/app.tsx',
        dependOn: 'shared',
      },
      transformers_table: {
        import: './src/main/resources/static/ts/transformers-table.tsx',
        dependOn: 'shared',
      },
      shared: 'lodash',
     },
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }]
            }
        ]
    }
};