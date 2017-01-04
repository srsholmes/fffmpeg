/* @flow */

require('babel-register');
require('babel-polyfill');
import { randomString, curry, compose, makeOptions, includes } from './util';
import { executeCmd, convertCmd } from './commands';
import { Maybe, Either } from 'ramda-fantasy';

const child = require('child_process');

const demoName = 'demo.mp4';

const callback = (err, stdout, stderr) => {
  if (err) console.error('There was an error: ', err);
  console.log('stderr', stderr);
};

const error = () => {
  throw new Error('Please provide a valid output format');
};

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


//const multi2 = [
//  addInput([ startTime(2), duration(1) ], demoName),
//  addInput([ startTime(5), duration(2) ], demoName),
//  addInput([ startTime(3), duration(1) ], demoName),
//  addInput([ startTime(4), duration(3) ], demoName)
//];

const options = [
  //setVideoSize(100, 200),
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

