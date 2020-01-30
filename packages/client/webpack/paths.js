const path = require('path');

module.exports = {
  root: path.resolve(__dirname, '../'),
  outputPathClient: path.resolve(__dirname, '../', 'dist'),
  entryPathClient: path.resolve(__dirname, '../', 'src/index.tsx'),
  templatePathClient: path.resolve(__dirname, '../', 'src/index.html'),
  imagesFolder: 'assets/images',
  fontsFolder: 'assets/fonts',
  appFolder: 'app',
};
