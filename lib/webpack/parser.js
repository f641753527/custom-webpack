const fs = require('fs')
const path = require('path')
const { parse } = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')

const parser = {
  // 读取文件并编译成AST
  getAST(filepath) {
    // 读取文件内容
    const result = fs.readFileSync(filepath, 'utf-8')
    // 转换为抽象语法树AST
    const ast = parse(result, { sourceType: 'module' })

    return ast
  },

  // 依赖收集
  getDeps(ast, filepath) {

    // 依赖收集容器
    const deps = new Map()

    // 文件目录路径
    const dirPath = path.dirname(filepath)

    traverse(ast, {
      // 依赖收集
      ImportDeclaration({ node }) {
        const relativePath = node.source.value
        const fullPath = path.resolve(dirPath, relativePath)

        deps.set(relativePath, fullPath)
      }
    })

    return deps
  },

  // AST解析为js语法
  generateToCodeFromAST(ast) {
    // 从AST打包成commonjs
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    })

    return code
  },

  // AST tree to list
  astTreeToList(astTree) {
    return astTree
  },

}

module.exports = parser