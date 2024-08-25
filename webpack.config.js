const path = require("path");
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;

module.exports = {
    entry: './app/app.module.js',
    output: {
        publicPath: "http://localhost:3000/",
        path: __dirname + "/dist",
        // filename: 'app.bundle.js',
        // path: path.join(__dirname, "./bin"),
        filename: 'app.bundle.js',
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
  
    devServer: {
      port: 3000,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
          use: {
            loader: "file-loader"
          }
        },
        {
          test: /\.(htm|html)$/,
          exclude: [/node_modules/, require.resolve('./index.html')],
          use: {
            loader: "html-loader",
            options: {
              esModule: false,
            },
          }
        }
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "pokemon-poc",
        filename: "remoteEntry.js",
        remotes: {
          // "common": "common@http://127.0.0.1/pilot/common/remoteEntry.js",
          // "nextjscomponents": "nextjscomponents@http://127.0.0.1/_next/static/remoteEntry.js",
          // "nextjscomponents": "nextjscomponents@http://127.0.0.1:3007/_next/pages/board-list.js",
          // "nextjscomponents": `promise new Promise(res=>{
          //   getRemoteVersionForHost('consumer', 'nextjscomponents').then(('http://127.0.0.1:3007/_next/static/remoteEntry.js')=>{
          //     injectRemoteScript('http://127.0.0.1:3007/_next/static/remoteEntry.js').then()=>{
                
          //     }
          //   })
          // })`
        },
        exposes: {},
        shared: {
          // ...deps,
          // react: {
          //   singleton: true,
          //   requiredVersion: deps.react,
          //   eager: true // false로 하면 React.laze()를 통해서만 참조할 수 있음
          // },
          // "react-dom": {
          //   singleton: true,
          //   requiredVersion: deps["react-dom"],
          // },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./index.html",
      }),
      new webpack.ContextReplacementPlugin(
        /\@angular(\\|\/)/,
        path.join(__dirname, '$_lazy_route_resources'),
        {}
    ),
    ],
}
