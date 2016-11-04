require('reflect-metadata');
require('../dist/universal-polyfills/node');
const startingPath = process.env.NODE_PATH ? `${process.env.NODE_PATH}:` : '';
process.env.NODE_PATH = `${startingPath}${process.cwd()}/dist`;
console.log('NODE_PATH', process.env.NODE_PATH);
console.log(require.resolve('platform-node'));
