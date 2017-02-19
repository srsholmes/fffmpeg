import {
  curry, makeOptions, compose, toLowerCase, includedFormat, concatString, makeFileName, K,
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

const converter = arr => curry((filename, options, outputFile, format, cb) => {
  compose(
    executeCmd(cb),
    K(console.log),
    concatString(FFMPEG),
    concatString(INPUT),
    concatString(filename),
    //x => type === 'sound' ? concatString('-vn')(x) : x,
    concatString(makeOptions(options)),
    makeFileName(outputFile),
    includedFormat(arr),
    toLowerCase
  )(format);
});

const concatConverter = arr => curry((inputs, output, format, cb) => {
  compose(
    executeCmd(cb),
    K(console.log),
    concatString(FFMPEG),
    concatString(makeOptions(inputs)),
    concatString('-y'),
    concatString(`-filter_complex concat=n=${inputs.length}:v=1:a=1`),
    makeFileName(output),
    includedFormat(arr),
    toLowerCase
  )(format);
});

export const concatVideo = concatConverter(VIDEO_FILE_TYPES);
export const convertToVideo = converter(VIDEO_FILE_TYPES);
export const convertToImages = curry((filename, format, cb) =>
  converter(IMAGE_FILE_TYPES)(filename, [], 'image%d', format, cb)
);

export const convertToGif = curry((filename, options, outputFile, cb) =>
  converter(IMAGE_FILE_TYPES)(filename, [], outputFile, 'gif', cb)
);

export const convertToAudio = converter(SOUND_FILE_TYPES);
