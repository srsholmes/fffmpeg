import { makeOptions, promisify, includes } from './util';
import { FFMPEG, INPUT } from './options';
import {
  VIDEO_FILE_TYPES,
  IMAGE_FILE_TYPES,
  SOUND_FILE_TYPES,
} from './constants';

const { exec } = require('child_process');

// Methods for constructing the command to send to ffmpeg.
export const executeCmd = cmd => exec(cmd, { stdio: [ 0, 1, 2 ] });

const makeCommand = (input, options, outputFile) =>
  `${FFMPEG} ${INPUT} ${input} ${makeOptions(options)} ${outputFile}`;

const concatCommand = (inputs, outputFile) =>
  `${FFMPEG}${makeOptions(inputs)} -y -filter_complex concat=n=${inputs.length}:v=1:a=1 ${outputFile}`;

const getfileExtension = f => f.split('.')[ 1 ];

const converter = (arr) => {
  return promisify(
    (inputFile, options, outputFile, cb) => {
      if (!includes(arr, getfileExtension(outputFile))) throw new Error('Specified format not support');
      return cb(null, executeCmd(makeCommand(inputFile, options, outputFile)))
    }
  );
};

const converterConcat = (arr) => {
  return promisify(
    (inputs, outputFile, cb) => {
      if (!includes(arr, getfileExtension(outputFile))) throw new Error('Specified format not support');
      return cb(null, executeCmd(concatCommand(inputs, outputFile)))
    }
  );
};

export const convertToVideo = converter(VIDEO_FILE_TYPES);
export const convertToAudio = converter(SOUND_FILE_TYPES);
export const concatVideo = converterConcat(VIDEO_FILE_TYPES);
export const convertToImages = (inputFile, options, format = 'png') =>
  converter(IMAGE_FILE_TYPES)(inputFile, options, `image%d.${format}`);

export const convertToGif = (inputFile, options, outputFile) =>
  converter(IMAGE_FILE_TYPES)(inputFile, options, `${outputFile}.gif`);
