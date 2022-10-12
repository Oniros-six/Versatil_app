module.exports = {
    entry: __dirname + '/src/app/index',
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    } ,

    resolve: {
        extensions: ['.js', '.jsx'],
      },

    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-react'
                ]
              }
            }
          },
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
        ]
      }
}

