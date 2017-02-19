/* @flow */
require('babel-register');
require('babel-polyfill');

import {
  convertToVideo,
  convertToImages,
  convertToAudio,
  concatVideo,
  convertToGif,
} from './commands';

export {
  convertToVideo,
  convertToImages,
  convertToAudio,
  concatVideo,
  convertToGif,
};

