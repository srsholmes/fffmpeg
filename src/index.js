require('babel-register');
require('babel-polyfill');
import curry from 'lodash.curry';
import compose from 'lodash.compose';
import { Maybe, Either } from 'ramda-fantasy';
const child = require('child_process');

export const demoName = 'demo.mp4';

const callback = (err, stdout, stderr) => {
  if (err) console.error('There was an error: ', err);
  console.log('stderr', stderr);
};

const startTime = time => ` -ss ${time}`;
const duration = time => ` -t ${time}`;
const addInput = curry((opts, input) => `${opts} -i ${input}`);
const muteVideo = () => ` -an`;
const framesPerSecond = fps => ` -r ${fps}`;

// set presentation time stamp
const setVideoSpeed = val => ` -filter:v "setpts=${val}*PTS"`
const setAudioSpeed = val => ` -filter:a "atempo=${val}"`

const includes = curry((val, arr) => arr.includes(val));

const includesFlip = curry((arr, val) => arr.includes(val));

const executeCmd = curry((cb, cmd) => child.exec(cmd, cb));
const convertCmd = curry((input, options, output) => `ffmpeg ${input} ${options} ${output}`);

const makeOptions = arr => arr.reduce((a, b) => a.concat(b), '').replace(/,/g, '');
const K = fn => x => (fn(x), x);

const error = () => {throw new Error('Please provide a valid output format')};
// TODO: Guard these with Maybe monad?

const convertToImages = curry((filename, format) => {
  const arr = [ 'pgm', 'ppm', 'pam', 'pgmyuv', 'jpeg', 'jpg', 'gif', 'png', 'tiff', 'sgi' ];
  return Maybe.of(format.toLowerCase())
  .map(includesFlip(arr))
  .map(x =>
    x ? executeCmd(callback)(`ffmpeg -i ${filename} image%d.${format}`)
      : error()
  );
});

const convertToAudio = curry((filename, output, format) => {
  const arr = [ 'wav', 'mp3', 'aac', 'ogg' ];
  return Maybe.of(format.toLowerCase())
  .map(includesFlip(arr))
  .map(x =>
    x ? executeCmd(callback)(`ffmpeg -i ${filename} -vn -ar 44100 -ac 2 -ab 256 -f ${format} ${output}.${format}`)
      : error()
  );
});

const convertVideo = curry((filename, options, output, format) => {
  const arr = [ 'mov', 'mp4', 'avi', 'mkv' ];
  return Maybe.of(format.toLowerCase())
  .map(includesFlip(arr))
  .map(x =>
    x ? executeCmd(callback)(`ffmpeg -i ${filename} ${options} ${output}.${format}`)
      : error()
  );
});

const concatVideo = curry((inputs, output, format) =>
  executeCmd(callback)(`ffmpeg ${makeOptions(inputs)} -y -filter_complex concat=n=${inputs.length}:v=1:a=1 ${output}.${format}`)
);

const options = [ startTime(2), duration(7), setVideoSpeed(4) ];

const multi2 = [
  addInput([ startTime(2), duration(1) ], demoName),
  addInput([ startTime(5), duration(2) ], demoName),
  addInput([ startTime(3), duration(1) ], demoName),
  addInput([ startTime(4), duration(3) ], demoName)
];

convertVideo(demoName, makeOptions(options), 'maybe', 'mp4');
//convertToImages(demoName, 'jpg');
//convertToAudio(demoName, 'output', 'mp3');
//concatVideo(multi2, 'myConcat', 'mp4');

// TODO: Look into outputting as streams for input to the next input allowing composition of videos

export {
  executeCmd,
  convertCmd,
  convertVideo,
  convertToImages,
  convertToAudio
};

