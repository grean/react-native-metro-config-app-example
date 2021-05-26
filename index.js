/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const pak = require('../package.json');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const escape = require('escape-string-regexp');
const path = require('path');

const root = path.resolve(__dirname, '..');

console.log(`root ${root}`);
console.log(`process.cwd ${process.cwd()}`);
console.log(`__dirname ${__dirname}`);

// const extraNodeModules = {
//   [pak.name]: root,
// };

const peerModules = Object.keys({
  ...pak.peerDependencies,
});

const watchFolders = [
  root,
];

module.exports = {
  projectRoot: __dirname,
  watchFolders,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: true,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    blacklistRE: exclusionList(peerModules.map((m) => new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`))),
    extraNodeModules: peerModules.reduce((acc, name) => {
      const lol = path.join(__dirname, 'node_modules', name);
      console.log(`name ${lol}`)
      acc[name] = lol
      return acc;
    }, {}),
    // extraNodeModules: new Proxy(extraNodeModules, {
    //   get: (target, name) => {
    //     if (name in target) {
    //       console.log(`target[name] ${target[name]}`)
    //     } else {
    //       console.log(`path  ${path.join(process.cwd(), `node_modules/${name}`)}`)
    //     }
    //     return name in target ? target[name] : path.join(process.cwd(), `node_modules/${name}`)
    //     //redirects dependencies referenced from pak.name to local node_modules
    //   }
    // }),
  },
};
