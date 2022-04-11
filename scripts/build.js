const webpack = require('../lib/webpack')

const config = require('../config/webpack.prod')

const compiler = webpack(config)

compiler.run()
