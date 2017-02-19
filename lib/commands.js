'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.concatVideo = exports.convertToAudio = exports.convertToImages = exports.convertToVideo = exports.callback = exports.executeCmd = undefined;

var _util = require('./util');

var _options = require('./options');

var child = require('child_process');
// Methods for constructing the command to send to ffmpeg.
var executeCmd = exports.executeCmd = (0, _util.curry)(function (cb, cmd) {
  return child.exec(cmd, cb);
});

var callback = exports.callback = function callback(err, stdout, stderr) {
  if (err) console.error('There was an error: ', err);
  console.log('stderr', stderr);
};

var VIDEO_FILE_TYPES = ['mov', 'mp4', 'avi', 'mkv'];
var IMAGE_FILE_TYPES = ['pgm', 'ppm', 'pam', 'pgmyuv', 'jpeg', 'jpg', 'gif', 'png', 'tiff', 'sgi'];
var SOUND_FILE_TYPES = ['wav', 'mp3', 'aac', 'ogg'];

var converter = function converter(type) {
  return function (arr) {
    return (0, _util.curry)(function (filename, options, outputFile, format, cb) {
      (0, _util.compose)(executeCmd(cb), (0, _util.K)(console.log), (0, _util.concatString)(_options.FFMPEG), (0, _util.concatString)(_options.INPUT), (0, _util.concatString)(filename), (0, _util.concatString)((0, _util.makeOptions)(options)), (0, _util.makeFileName)(outputFile), (0, _util.includedFormat)(arr), _util.toLowerCase)(format);
    });
  };
};

var convertToVideo = exports.convertToVideo = converter('video')(VIDEO_FILE_TYPES);
var convertToImages = exports.convertToImages = (0, _util.curry)(function (filename, format, cb) {
  return converter('image')(IMAGE_FILE_TYPES)(filename, [], 'image%d', format, cb);
});
var convertToAudio = exports.convertToAudio = converter('sound')(SOUND_FILE_TYPES);

//export const convertToImages = curry((filename, format, cb) => {
//
//  return Maybe.of(format.toLowerCase())
//  .map(includes(arr))
//  .map(x =>
//    x ? executeCmd(cb)(`ffmpeg -i ${filename} image%d.${format}`)
//      : formatError()
//  );
//});


//export const convertToAudio = curry((filename, output, format, cb) => {
//
//  return Maybe.of(format.toLowerCase())
//  .map(includes(arr))
//  .map(x =>
//    x ? executeCmd(cb)(`ffmpeg -i ${filename} -vn -ar 44100 -ac 2 -ab 256 -f ${format} ${output}.${format}`)
//      : formatError()
//  );
//});

var concatVideo = exports.concatVideo = (0, _util.curry)(function (inputs, output, format, cb) {
  return executeCmd(cb)('ffmpeg ' + (0, _util.makeOptions)(inputs) + ' -y -filter_complex concat=n=' + inputs.length + ':v=1:a=1 ' + output + '.' + format);
});