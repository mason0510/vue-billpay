// const path = require("path");
// const tsImportPluginFactory = require('ts-import-plugin')
// module.exports = {
//   rules: [
//     {
//       test: /\.(jsx|tsx|js|ts)$/,
//       loader: 'ts-loader',
//       options: {
//         transpileOnly: true,
//         getCustomTransformers: () => ({
//           before: [ tsImportPluginFactory( /** options */) ]
//         }),
//         compilerOptions: {
//           module: 'es2015'
//         }
//       },
//       exclude: /node_modules/
//     }
//   ],
//   // 基本路径
//   publicPath: "./"
// }