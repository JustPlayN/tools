const rollupTypescript = require('rollup-plugin-typescript2')
const babel = require('rollup-plugin-babel')
const progress = require('rollup-plugin-progress')

let fileList = [
  // { file: 'sdkApi', name: 'sdkApi', dir: '/utils' },
  // { file: 'utils', name: 'utils', dir: '/utils' },
  // { file: 'tools', name: 'tools', dir: '/utils'},
  // { file: 'wxBridge', name: 'wxBridge', dir: '/jsBridge'},
  { file: 'index', name: 'index', dir: '/'},
]
let myPlugins = [
  rollupTypescript({
    tsconfig: 'tsconfig.json',
    clean: true
  }),
  babel({
    exclude: 'node_modules/**'
  }),
  progress()
]
let configs = fileList.map(({file, name, dir}) => {
  return {
    input: `src${dir}/${file}.ts`,
    output: [{
      file: `dist/${file}.js`,
      format: 'es',   // 输出es格式
      name
    }, {
      file: `dist/${file}.umd.js`,
      format: 'umd',  // 输出umd格式，通用模块定义，以amd，cjs 和 iife 为一体
      name
    }, {
      file: `dist/${file}.amd.js`,
      format: 'amd',  // 输出amd格式
      name
    }],
    plugins: myPlugins
  }
})
module.exports = configs