const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

let cesiumSource = './node_modules/cesium/Source'
let cesiumWorkers = '../Build/Cesium/Workers'

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import 'assets/css/public.scss';`    // scss全局变量
            }
        }
    },
    chainWebpack: config => {
        // 路径别名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('components', resolve('src/components'))
            .set('assets', resolve('src/assets'))
    },
    // 以下1-6均为 cesium + vue 必须配置
    configureWebpack: {
        output: {
            sourcePrefix: ' ' // 1
        },
        amd: {
            // 2
            toUrlUndefined: true
        },
        resolve: {
            alias: {
                cesium: path.resolve(__dirname, cesiumSource) // 3
            }
        },
        plugins: [
            // 4
            new CopyWebpackPlugin({
                patterns: [
                    { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' },
                    { from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
                    { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' },
                    {
                        from: path.join(cesiumSource, 'ThirdParty/Workers'),
                        to: 'ThirdParty/Workers'
                    }
                ]
            }),
            new webpack.DefinePlugin({
                // 5
                CESIUM_BASE_URL: JSON.stringify('./')
            }),
        ],
        module: {
            // unknownContextCritical: /^.\/.*$/,
            unknownContextCritical: false // 6
        }
    }
}
