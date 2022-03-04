module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
    '@babel/preset-react',
    '@linaria',
  ],
  plugins: ['effector/babel-plugin', '@babel/transform-runtime'],
}
