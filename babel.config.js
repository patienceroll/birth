const path = require('path');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  "plugins": [
    '@babel/plugin-proposal-class-properties',
    'react-native-reanimated/plugin',
    [
      "module-resolver",
      {
        "root": [
          path.resolve(__dirname)
        ],
        "alias": {
          "src": "./src"
        }
      }
    ]]
};
