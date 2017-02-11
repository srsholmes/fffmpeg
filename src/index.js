/* @flow */
require('babel-register');
require('babel-polyfill');

import { executeCmd, convertCmd, convertToImages, convertToAudio, convertToVideo, concatVideo } from './commands';

export {
  executeCmd,
  convertCmd,
  convertToImages,
  convertToAudio,
  convertToVideo,
  concatVideo,
};

