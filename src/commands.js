import { curry, makeOptions, includes } from './util';
import { Maybe, Either } from 'ramda-fantasy';
const child = require('child_process');

// Methods for constructing the command to send to ffmpeg.
export const executeCmd = curry((cb, cmd) => child.exec(cmd, cb));
export const convertCmd = curry((input, options, output) => `ffmpeg ${input} ${options} ${output}`);

export const formatError = () => {
  throw new Error('Please provide a valid output format');
};

export const callback = (err, stdout, stderr) => {
  if (err) console.error('There was an error: ', err);
  console.log('stderr', stderr);
};

// TODO: Change these to Either monad?

export const convertToImages = curry((filename, format, cb) => {
  const arr = [ 'pgm', 'ppm', 'pam', 'pgmyuv', 'jpeg', 'jpg', 'gif', 'png', 'tiff', 'sgi' ];
  return Maybe.of(format.toLowerCase())
  .map(includes(arr))
  .map(x =>
    x ? executeCmd(cb)(`ffmpeg -i ${filename} image%d.${format}`)
      : formatError()
  );
});

// TODO: More options here
export const convertToAudio = curry((filename, output, format, cb) => {
  const arr = [ 'wav', 'mp3', 'aac', 'ogg' ];
  return Maybe.of(format.toLowerCase())
  .map(includes(arr))
  .map(x =>
    x ? executeCmd(cb)(`ffmpeg -i ${filename} -vn -ar 44100 -ac 2 -ab 256 -f ${format} ${output}.${format}`)
      : formatError()
  );
});

export const convertToVideo = curry((filename, options, output, format, cb) => {
  const arr = [ 'mov', 'mp4', 'avi', 'mkv' ];
  return Maybe.of(format.toLowerCase())
  .map(includes(arr))
  .map(x =>
    // TODO: Some options may need commas so makeOptions might break aspect ratio filters.
    x ? executeCmd(cb)(`ffmpeg -i ${filename} ${makeOptions(options)} ${output}.${format}`)
      : formatError()
  );
});

export const concatVideo = curry((inputs, output, format, cb) =>
  executeCmd(cb)(`ffmpeg ${makeOptions(inputs)} -y -filter_complex concat=n=${inputs.length}:v=1:a=1 ${output}.${format}`)
);
