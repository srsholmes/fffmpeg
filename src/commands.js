import {
  curry, makeOptions, compose, toLowerCase, includedFormat, concatString, makeFileName, K,
} from './util';
import {
  FFMPEG,
  INPUT,
} from './options';

const child = require('child_process');
// Methods for constructing the command to send to ffmpeg.
export const executeCmd = curry((cb, cmd) => child.exec(cmd, cb));

export const callback = (err, stdout, stderr) => {
  if (err) console.error('There was an error: ', err);
  console.log('stderr', stderr);
};

const VIDEO_FILE_TYPES =  [ 'mov', 'mp4', 'avi', 'mkv' ];
const IMAGE_FILE_TYPES = [ 'pgm', 'ppm', 'pam', 'pgmyuv', 'jpeg', 'jpg', 'gif', 'png', 'tiff', 'sgi' ];
const SOUND_FILE_TYPES = [ 'wav', 'mp3', 'aac', 'ogg' ];

const converter = type => arr => curry((filename, options, outputFile, format, cb) => {
  compose(
    executeCmd(cb),
    K(console.log),
    concatString(FFMPEG),
    concatString(INPUT),
    concatString(filename),
    concatString(makeOptions(options)),
    makeFileName(outputFile),
    includedFormat(arr),
    toLowerCase
  )(format);
});

export const convertToVideo = converter('video')(VIDEO_FILE_TYPES);
export const convertToImages = curry((filename, format, cb) => converter('image')(IMAGE_FILE_TYPES)(filename, [], 'image%d', format, cb));
export const convertToAudio = converter('sound')(SOUND_FILE_TYPES);

//export const convertToAudio = curry((filename, output, format, cb) => {
//
//  return Maybe.of(format.toLowerCase())
//  .map(includes(arr))
//  .map(x =>
//    x ? executeCmd(cb)(`ffmpeg -i ${filename} -vn -ar 44100 -ac 2 -ab 256 -f ${format} ${output}.${format}`)
//      : formatError()
//  );
//});

export const concatVideo = curry((inputs, output, format, cb) =>
  executeCmd(cb)(`ffmpeg ${makeOptions(inputs)} -y -filter_complex concat=n=${inputs.length}:v=1:a=1 ${output}.${format}`)
);
