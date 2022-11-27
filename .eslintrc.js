module.exports = {
  root: true,
  env: {
    node: true,
    jquery: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
},
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ],
  // dev:{
  //   // Paths
  //   assetsSubDirectory: 'static',
  //   assetsPublicPath: '/',
  //   //添加代理
  //   proxyTable: {
  //     '/api':{
  //       target:'http://localhost:8080',
  //       pathRewrite:{'^/api':'/static'}
  //     }
  //   },
  //   host:'localhost',
  //   port:8080
  // }
}
