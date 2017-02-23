import {
  curry, makeOptions, compose, toLowerCase, includedFormat, concatWithSpace, makeFileName, K,
} from './util';
import { FFMPEG, INPUT } from './options';
import {
  VIDEO_FILE_TYPES,
  IMAGE_FILE_TYPES,
  SOUND_FILE_TYPES,
} from './constants';

const child = require('child_process');
// Methods for constructing the command to send to ffmpeg.
export const executeCmd = curry((cb, cmd) => child.exec(cmd, cb));

const converter = arr => curry((inputFile, options, outputFile, format, cb) => {
  compose(
    executeCmd(cb),
    K(console.log),
    concatWithSpace(FFMPEG),
    concatWithSpace(INPUT),
    concatWithSpace(inputFile),
    concatWithSpace(makeOptions(options)),
    makeFileName(outputFile),
    includedFormat(arr),
    toLowerCase
  )(format);
});

const concatConverter = arr => curry((inputs, outputFile, format, cb) => {
  compose(
    executeCmd(cb),
    K(console.log),
    concatWithSpace(FFMPEG),
    concatWithSpace(makeOptions(inputs)),
    concatWithSpace('-y'),
    concatWithSpace(`-filter_complex concat=n=${inputs.length}:v=1:a=1`),
    makeFileName(outputFile),
    includedFormat(arr),
    toLowerCase
  )(format);
});

export const convertToVideo = converter(VIDEO_FILE_TYPES);

export const convertToImages = curry((inputFile, options, format, cb) =>
  converter(IMAGE_FILE_TYPES)(inputFile, options, 'image%d', format, cb)
);

export const convertToGif = curry((inputFile, options, outputFile, cb) =>
  converter(IMAGE_FILE_TYPES)(inputFile, options, outputFile, 'gif', cb)
);

export const convertToAudio = converter(SOUND_FILE_TYPES);

export const concatVideo = concatConverter(VIDEO_FILE_TYPES);
