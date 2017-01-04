require('babel-register');
require('babel-polyfill');
import { curry, compose } from './util';
import { Maybe, Either } from 'ramda-fantasy';

const child = require('child_process');
export const demoName = 'demo.mp4';
const K = fn => x => (fn(x), x);
const randomString = () => Math.random().toString(36).substr(2, 5);

const callback = (err, stdout, stderr) => {
  if (err) console.error('There was an error: ', err);
  console.log('stderr', stderr);
};

// Methods for constructing the command to send to ffmpeg.
const includes = curry((arr, val) => arr.includes(val));
const executeCmd = curry((cb, cmd) => child.exec(cmd, cb));
const convertCmd = curry((input, options, output) => `ffmpeg ${input} ${options} ${output}`);
const makeOptions = arr => arr.reduce((a, b) => a.concat(b), '').replace(/,/g, '');

// Erro handling
const requiredError = val => {
  throw new Error(`Please provide a value for ${val}`);
};

const error = () => {
  throw new Error('Please provide a valid output format');
};
// Methods for modifying video.
const addInput = curry((opts, input) => `${opts} -i ${input}`);

// TODO: Make this nicer, change the functions before exporting and give them required error funcs
const startTime = (time = requiredError('time')) => ` -ss ${time}`;
const duration = (duration = requiredError('time')) => ` -t ${duration}`;
const muteVideo = () => ` -an`;
const framesPerSecond = (fps = requiredError('fps')) => ` -r ${fps}`;
const changeVolume = (vol = requiredError('volume')) => `-af 'volume=${vol}'`;
const setVideoSize = (w, h) => {
  // TODO: work out different ways to scale video, e.g. X/Y coordinate, percentage
  // See https://trac.ffmpeg.org/wiki/Scaling%20(resizing)%20with%20ffmpeg

  // If two numbers, set pixel size
  return ` -vf scale=${w}:${h}`;

  // If 'scale', scale both:
  //return ` -vf scale=iw*${x}:ih*${x}`;

  // If string 'half'
  //return ` -vf scale=iw*.5:ih*.5`;

    // If string 'double'
  //return ` -vf scale=iw*2:ih*2`;

}

// Speeds
const setVideoSpeed = val => ` -filter:v "setpts=${val}*PTS"`;
const setAudioSpeed = val => ` -filter:a "atempo=${val}"`;
const loopVideo = val => ` -loop ${val}`;

// Codecs
const setCodec = type => codec => `-${type}codec ${codec}`;
const setAudioCodec = setCodec('a');
const setVideoCodec = setCodec('v');

// Bitrates
const setBitrate = type => rate => ` -b:${type} ${rate}k`;
const setAudioBitrate = setBitrate('a');
const setVideoBitrate = setBitrate('v');
const setVariableBitrate = val => ` - vbr ${val}`

const setMetaData = curry((flag, data) => {
  const metaDataFlag = (flag, data) => ` -metadata ${flag}="${data}"`;
  return Array.isArray(flag)
    ? makeOptions(flag.map(([ a, b ]) => metaDataFlag(a, b)))
    : metaDataFlag(flag, data);
});

const setCreationTime = (time = Date.now().toString()) => setMetaData('creation_time', time);

// TODO: Change these to Either monad?

const convertToImages = curry((filename, format, cb) => {
  const arr = [ 'pgm', 'ppm', 'pam', 'pgmyuv', 'jpeg', 'jpg', 'gif', 'png', 'tiff', 'sgi' ];
  return Maybe.of(format.toLowerCase())
  .map(includes(arr))
  .map(x =>
    x ? executeCmd(cb)(`ffmpeg -i ${filename} image%d.${format}`)
      : error()
  );
});

// TODO: More options here
const convertToAudio = curry((filename, output, format, cb) => {
  const arr = [ 'wav', 'mp3', 'aac', 'ogg' ];
  return Maybe.of(format.toLowerCase())
  .map(includes(arr))
  .map(x =>
    x ? executeCmd(cb)(`ffmpeg -i ${filename} -vn -ar 44100 -ac 2 -ab 256 -f ${format} ${output}.${format}`)
      : error()
  );
});

const convertVideo = curry((filename, options, output, format, cb) => {
  const arr = [ 'mov', 'mp4', 'avi', 'mkv' ];
  return Maybe.of(format.toLowerCase())
  .map(includes(arr))
  .map(x =>
  // TODO: Some options may need commas so makeOptions might break aspect ratio filters.
    x ? executeCmd(cb)(`ffmpeg -i ${filename} ${makeOptions(options)} ${output}.${format}`)
      : error()
  );
});

const concatVideo = curry((inputs, output, format, cb) =>
  executeCmd(cb)(`ffmpeg ${makeOptions(inputs)} -y -filter_complex concat=n=${inputs.length}:v=1:a=1 ${output}.${format}`)
);


const multi2 = [
  addInput([ startTime(2), duration(1) ], demoName),
  addInput([ startTime(5), duration(2) ], demoName),
  addInput([ startTime(3), duration(1) ], demoName),
  addInput([ startTime(4), duration(3) ], demoName)
];

const options = [
  setVideoSize(100, 200),
  //startTime(3),
  //duration(8),
  //setMetaData('authojjjjr', 'Simossssssn Holmes')
];

convertVideo(demoName, options, randomString(), 'mp4', callback);
//convertToImages(demoName, 'jpg', callback);
//convertToAudio(demoName, 'output', 'mp3', callback);
//concatVideo(multi2, 'concatTest', 'mp4', callback);

// TODO: Look into outputting as streams for input to the next input allowing composition of videos
// TODO: Fix bug if video already exists.

export {
  executeCmd,
  convertCmd,
  convertVideo,
  convertToImages,
  convertToAudio
};

