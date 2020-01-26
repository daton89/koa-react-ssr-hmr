function isBabelRegister(caller) {
  return !!(caller && caller.name === '@babel/register')
}

module.exports = function babelConfig(api) {
  // api.cache(true)

  const isRegister = api.caller(isBabelRegister)

  // console.log('isRegister', isRegister);

  const isServerSideRendered = process.env.BABEL_ENV === 'server'

  // console.log('isServerSideRendered', isServerSideRendered);

  const presets = [
    // use latest js and transform it for all browser support
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    // add react plugins like jsx support
    '@babel/preset-react',
  ]

  const plugins = [
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-transform-react-jsx',
    '@loadable/babel-plugin',
    'react-loadable/babel',
  ]

  return {
    presets,
    plugins,
  }
}
