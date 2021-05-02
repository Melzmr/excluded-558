const path =  require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = () => {
  const tsConfigPath = path.resolve(__dirname, 'tsconfig.json');
  const chunkName = '[name]-[contenthash]';

  return {
    context: __dirname,
    mode: 'development',
    target: 'web',
    entry: './src/index.ts',
    output: {
      filename: `js/${chunkName}.js`,
      chunkFilename: `js/chunks/${chunkName}.js`,
      path: path.resolve(__dirname, './dist/'),
      publicPath: '/',
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            configFile: tsConfigPath,
          },
        },
      ],
    },

    plugins: [
      new ForkTsCheckerWebpackPlugin({
        async: true,
        typescript: {
          configFile: tsConfigPath,
        },
        logger: { infrastructure: 'console' },
      }),
    ],

    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      emitOnErrors: false,
    },
  };
};
