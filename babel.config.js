const presets = [
    [
      "@babel/env",
      {
        targets: {
          edge: "17",
          firefox: "60",
          chrome: "64",
          safari: "11.1",
        },
        useBuiltIns: "entry",
        corejs: "3.6.4",
      },
    ],
  ];
  
  module.exports = { presets };