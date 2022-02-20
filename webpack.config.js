require('dotenv').config()

const { merge } = require('webpack-merge')

const common = require('./webpack/config.common')
const dev = require('./webpack/config.dev')
const prod = require('./webpack/config.prod')

const isDev = process.env.NODE_ENV && process.env.NODE_ENV === 'development'

const developmentConfig = merge([common, dev])
const productionConfig = merge([common, prod])

module.exports = isDev ? developmentConfig : productionConfig
