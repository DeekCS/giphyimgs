module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module-resolver', {
      root: ['./src'],
      alias: {
        '@components': './src/components',
        '@hooks': './src/hooks',
        '@utils': './src/utils',
        '@types': './src/types',
        '@screens': './src/screens'
      }
    }]
  ]
};