module.exports = {
  entry: { background: 'src/background.ts' },
  output: {
    filename: '[name].js'
  },
  optimization: {
    runtimeChunk: false
  }
}
