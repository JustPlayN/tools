const express = require('express')
const rollup = require('rollup')
const vue = require('rollup-plugin-vue')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')
const configs = require('./rollup.prod')

configs.push({
  input: 'example/main.js',
  output: {
    format: 'esm',
    file: 'example/index.js'
  },
  plugins: [
    resolve(),  // 解决引入vue无法编译的问题
    commonjs(), // 解决不支持commonjs
    vue(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development') // 解决rollup没有process导致报错
    })
  ]
})

const app = express()

app.use(express.static('example'))
app.listen(3000, () => {
  console.log('http://localhost:3000/')
})

const watcher = rollup.watch(configs)
watcher.on('event', event => {
  if (event.code === 'FATAL') {
    console.error(event.error)
  }
})
