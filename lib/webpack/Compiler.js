const {
  getAST,
  getDeps,
  generateToCodeFromAST,
  astTreeToList,
} = require('./parser')

class Compiler {
  constructor(options = {}) {
    this.options = options
  }

  // 启动编译
  run() {
    const filepath = this.options.entry

    // 打包成AST Tree
    const astTree = this.build(filepath)

    // AST Tree 转为数组
    astTreeToList(astTree)

  }

  // 构建
  build(filepath) {
    // 获取ast
    const ast = getAST(filepath)

    // 依赖收集
    const deps = getDeps(ast, filepath)

    // 从AST打包成commonjs
    const code = generateToCodeFromAST(ast)

    // const children = deps.map(dep => )

    // 打包deps依赖
    const children = []
    for (const dep of deps) {
      const [relativePath, fullpath] = dep
      const module = this.build(fullpath)
      children.push(module)
    }

    return {
      // 文件路径
      filepath,
      // 源代码
      code,
      // 依赖
      deps,
      // 子模块
      children,
    }
  }
}

module.exports = Compiler
