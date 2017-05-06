import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import VisualizerPlugin from 'webpack-visualizer-plugin';
import { isProductionBuild, fromRoot } from './environment';
import agnosticConfig from './webpack.config.agnostic';

// Make available a defined subset of process.env variables to the client
const clientExposedEnvVars = process.env.CLIENT_EXPOSED_ENV_VARS.split(',');
const clientExposedEnv = {};
Object
    .keys(process.env)
    .filter(key => clientExposedEnvVars.includes(key))
    .forEach(key => clientExposedEnv[key] = JSON.stringify(process.env[key]));

const ENV_AGNOSTIC_CONFIG = {
    entry: {
        gravity: fromRoot('client/gravity.ts')
    },

    output: {
        publicPath: '',
        path: fromRoot('dist/client'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].bundle.map',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['gravity'],
            minChunks: Infinity
        }),
        new webpack.DefinePlugin({
            'process.env': clientExposedEnv
        }),
        new HtmlWebpackPlugin({
            template: fromRoot('client/index.html')
        })
    ],

    module: {
        rules: [
            //=> Disable any linking with server code!
            {
                test: /(\\|\/)server(\\|\/)/,
                loader: function(context) {
                    const msg =
                        `Attempted to link server code from client code!\n` +
                        `File ${context.issuer} requires ${context.resource}.\n` +
                        `We can't permit that!\n`;

                    console.error(`\n\n${msg}`);
                    process.exit(1);
                }
            },
            //=> Loaders
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: { minimize: false },
                exclude: [fromRoot('client/index.html')]
            }
        ]
    },

    devServer: {
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 }
    },

    node: {
        global: true,
        crypto: 'empty',
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: false,
        clearImmediate: false,
        setImmediate: false
    }
};

const DEVELOPMENT_CONFIG = {
    devtool: 'source-map'
};

const PRODUCTION_CONFIG = {
    devtool: false,

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            comments: false, // also strips licenses
            sourceMap: false
        }),
        new CompressionPlugin({
            test: /\.js$/
        }),
        new VisualizerPlugin()
    ]
};

export default webpackMerge(
    agnosticConfig,
    ENV_AGNOSTIC_CONFIG,
    isProductionBuild ? PRODUCTION_CONFIG : DEVELOPMENT_CONFIG
);

