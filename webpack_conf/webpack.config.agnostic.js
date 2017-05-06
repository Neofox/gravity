import { fromRoot } from './environment';

export default {
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.ts$/,
                loader: 'tslint-loader'
            },
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [fromRoot('node_modules')]
    }
}
