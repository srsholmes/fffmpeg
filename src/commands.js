
import { randomString, curry, compose, makeOptions, includes } from './util';
// Methods for constructing the command to send to ffmpeg.
const child = require('child_process');

export const callback = (err, stdout, stderr) => {
  if (err) console.error('There was an error: ', err);
  console.log('stderr', stderr);
};

// Methods for constructing the command to send to ffmpeg.
export const executeCmd = curry((cb, cmd) => child.exec(cmd, cb));
export const convertCmd = curry((input, options, output) => `ffmpeg ${input} ${options} ${output}`);
