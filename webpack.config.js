const path = require('path')
require('webpack')

// plugins
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const VERSION = '01';
const PUBLIC_PATH = `/gametober/day/${VERSION}/`;
const BUILD_FOLDER_PATH = path.resolve(__dirname, 'dist/');
const HTML_TEMPLATE_PATH = 'public/index.html';

const productionConfig = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: BUILD_FOLDER_PATH,
    publicPath: PUBLIC_PATH,
    filename: 'static/js/bundle.[hash:8].js',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        uglifyOptions: {
          output: {
            comments: false,
          },
        },
      })
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      path: BUILD_FOLDER_PATH,
      filename: 'static/css/[name].[hash:8].css',
    }),
    new htmlWebpackPlugin({
      template: HTML_TEMPLATE_PATH,
      filename: 'index.html',
      inject: 'body',
      title: `Gametober Day ${VERSION}`,
      minify: {
        collapseWhiteSpace: true,
        removeComments: true,
        removeRedundanteAttributes: true,
      }
    })
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader',
        options: {
          cache: false,
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: ["css-hot-loader", MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
};

module.exports = (env, argv) => {
  const { mode } = argv;

  if (mode === 'development') {
    return {
      ...productionConfig,
      mode: 'development',
      output: {
        ...productionConfig.output,
        publicPath: '/',
      },
      devtool: 'eval-source-map',
      plugins: [
        new MiniCssExtractPlugin({
          path: BUILD_FOLDER_PATH,
          filename: 'static/css/[name].css',
        }),
        new htmlWebpackPlugin({
          template: HTML_TEMPLATE_PATH,
          filename: 'index.html',
          inject: 'body',
          title: `Gametober version ${VERSION}`,
        }),
      ],
      module: {
        rules: productionConfig.module.rules.filter(r => r.loader !== 'eslint-loader'),
      },
    };
  }

  return productionConfig;
}
