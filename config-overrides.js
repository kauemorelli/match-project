const {
  override,
  fixBabelImports,
  // addLessLoader,
} = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
      libraryName: "antd", libraryDirectory: "es", style: 'css' // change importing css to less
  }),
);

// const { injectBabelPlugin } = require('customize-cra');

// const rootImport = [
//   "root-import",
//   {
//     rootPathPrefix: '~',
//     rootPathSufix: 'src'
//   }
// ];
// module.exports = config => injectBabelPlugin(rootImport,config);
