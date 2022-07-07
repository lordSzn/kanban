module.exports = {
  presets: [
    ['@babel/preset-env', { modules: false }],
    '@babel/preset-typescript',
    '@babel/preset-react',
    '@linaria',
  ],
  plugins: [
    [
      'effector/babel-plugin',
      {
        factories: ['src/shared/api/requests/request', '~/shared/api/requests/request'],
      },
    ],
  ],
  env: {
    test: {
      plugins: [
        'effector/babel-plugin',
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-modules-commonjs',
        [
          'module-resolver',
          {
            alias: {
              '~': './src',
            },
          },
        ],
      ],
    },
  },
}
