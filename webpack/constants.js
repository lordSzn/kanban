const path = require('path')

const source = path.resolve(__dirname, 'src')

exports.context = source
exports.build = path.resolve(__dirname, 'dist')
exports.entryMain = path.resolve(source, 'index.tsx')
exports.indexHTML = path.resolve(source, 'index.html')
exports.extensions = ['js', 'jsx', 'ts', 'tsx', 'json']

exports.outputDev = {
  js: 'bundle.js',
}

exports.outputProd = {
  js: 'dist/[name].[contenthash].js',
}
