const Compiler = require('./Compiler')

function webapck(config) {
  return new Compiler(config)
}


module.exports = webapck