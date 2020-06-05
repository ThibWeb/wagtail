const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sass = require('sass');


// Generates a path to an entry file to be compiled by Webpack.
const getEntryPath = (app, folder, filename) => path.resolve('wagtail', app, 'static_src', `wagtail${app}`, folder, filename);
// Generates a path to the output bundle to be loaded in the browser.
const getOutputPath = (app, folder, filename) => path.join('wagtail', app, 'static', `wagtail${app}`, folder, filename);

// Mapping from package name to exposed global variable.
const exposedDependencies = {
  'focus-trap-react': 'FocusTrapReact',
  'react': 'React',
  'react-dom': 'ReactDOM',
  'react-transition-group/CSSTransitionGroup': 'CSSTransitionGroup',
  'draft-js': 'DraftJS',
};

module.exports = function exports() {
  const entry = {};

  // Create a vendor chunk that will contain polyfills, and all third-party dependencies.
  entry[getOutputPath('admin', 'js', 'vendor')] = ['./client/src/utils/polyfills.js'];

  entry[getOutputPath('admin', 'js', 'wagtailadmin')] = getEntryPath('admin', 'app', 'wagtailadmin.entry.js');
  entry[getOutputPath('admin', 'js', 'draftail')] = getEntryPath('admin', 'app', 'draftail.entry.js');

  entry[getOutputPath('styleguide', 'css', 'styleguide')] = getEntryPath('styleguide', 'scss', 'styleguide.scss');
  entry[getOutputPath('modeladmin', 'css', 'index')] = getEntryPath('modeladmin', 'scss', 'index.scss');
  entry[getOutputPath('modeladmin', 'css', 'breadcrumbs_page')] = getEntryPath('modeladmin', 'scss', 'breadcrumbs_page.scss');
  entry[getOutputPath('modeladmin', 'css', 'choose_parent_page')] = getEntryPath('modeladmin', 'scss', 'choose_parent_page.scss');

  return {
    entry: entry,
    output: {
      path: path.resolve('.'),
      filename: 'js/[name].js',
      publicPath: '/static/'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
      }),
      new CopyPlugin({
        patterns: [
          { from: 'wagtail/admin/static_src/', to: 'wagtail/admin/static/', globOptions: { ignore: ['**/{app,scss}/**', '*.css'] } },
          { from: 'wagtail/documents/static_src/', to: 'wagtail/documents/static/', globOptions: { ignore: ['**/{app,scss}/**', '*.css'] } },
          { from: 'wagtail/embeds/static_src/', to: 'wagtail/embeds/static/', globOptions: { ignore: ['**/{app,scss}/**', '*.css'] } },
          { from: 'wagtail/images/static_src/', to: 'wagtail/images/static/', globOptions: { ignore: ['**/{app,scss}/**', '*.css'] } },
          { from: 'wagtail/search/static_src/', to: 'wagtail/search/static/', globOptions: { ignore: ['**/{app,scss}/**', '*.css'] } },
          { from: 'wagtail/snippets/static_src/', to: 'wagtail/snippets/static/', globOptions: { ignore: ['**/{app,scss}/**', '*.css'] } },
          { from: 'wagtail/users/static_src/', to: 'wagtail/users/static/', globOptions: { ignore: ['**/{app,scss}/**', '*.css'] } },
          { from: 'wagtail/contrib/settings/static_src/', to: 'wagtail/contrib/settings/static/', globOptions: { ignore: ['**/{app,scss}/**', '*.css'] } },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(scss|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: () => [
                  autoprefixer(),
                  cssnano({
                    preset: 'default',
                  }),
                ],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                implementation: sass,
                sassOptions: {
                  outputStyle: 'compressed',
                },
              },
            },
          ],
        },
      ].concat(Object.keys(exposedDependencies).map((name) => {
        const globalName = exposedDependencies[name];

        // Create expose-loader configs for each Wagtail dependency.
        return {
          test: require.resolve(name),
          use: [
            {
              loader: 'expose-loader',
              options: globalName,
            },
          ],
        };
      }))
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: getOutputPath('admin', 'js', 'vendor'),
            chunks: 'initial',
            minChunks: 2,
            reuseExistingChunk: true,
          },
        },
      },
    },

    // See https://webpack.js.org/configuration/devtool/.
    devtool: 'source-map',

    // For development mode only.
    watchOptions: {
      poll: 1000,
      aggregateTimeout: 300,
    },

    stats: {
      // Add chunk information (setting this to `false` allows for a less verbose output)
      chunks: false,
      // Add the hash of the compilation
      hash: false,
      // `webpack --colors` equivalent
      colors: true,
      // Add information about the reasons why modules are included
      reasons: false,
      // Add webpack version information
      version: false,
      // Set the maximum number of modules to be shown
      maxModules: 0,
    },
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
  };
};
