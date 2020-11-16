module.exports = {
  presets: ['@babel/preset-typescript'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ts', '.js', '.json'],
        alias: {
          utils: './src/utils',
          lib: './src/lib',
          handlers: './src/handlers',
        },
      },
    ],
  ],
}
