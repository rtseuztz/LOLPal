module.exports = {
    devtool: 'source-map',
    entry: "./public/app.tsx",
    mode: "production",
    output: {
        filename: "./app-bundle.js"
    },
    resolve: {
        extensions: ['.Webpack.js', '.web.js', '.ts', '.js', '.jsx', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                exclude: /(node_modules|bower_components)/,
                use: 'ts-loader'
            }
        ]
    }
}

