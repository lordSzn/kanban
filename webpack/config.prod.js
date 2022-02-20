const config = require('./constants')

module.exports = {
  mode: 'production',
  entry: config.entryMain,
  output: {
    publicPath: '/',
    filename: config.outputProd.js,
    path: config.build,
  },
}
