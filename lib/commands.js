'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.concatVideo = exports.convertToVideo = exports.convertToAudio = exports.convertToImages = exports.callback = exports.formatError = exports.convertCmd = exports.executeCmd = undefined;

var _util = require('./util');

var _ramdaFantasy = require('ramda-fantasy');

var child = require('child_process');

// Methods for constructing the command to send to ffmpeg.
var executeCmd = exports.executeCmd = (0, _util.curry)(function (cb, cmd) {
  return child.exec(cmd, cb);
});
var convertCmd = exports.convertCmd = (0, _util.curry)(function (input, options, output) {
  return 'ffmpeg ' + input + ' ' + options + ' ' + output;
});

var formatError = exports.formatError = function formatError() {
  throw new Error('Please provide a valid output format');
};

var callback = exports.callback = function callback(err, stdout, stderr) {
  if (err) console.error('There was an error: ', err);
  console.log('stderr', stderr);
};

// TODO: Change these to Either monad?

var convertToImages = exports.convertToImages = (0, _util.curry)(function (filename, format, cb) {
  var arr = ['pgm', 'ppm', 'pam', 'pgmyuv', 'jpeg', 'jpg', 'gif', 'png', 'tiff', 'sgi'];
  return _ramdaFantasy.Maybe.of(format.toLowerCase()).map((0, _util.includes)(arr)).map(function (x) {
    return x ? executeCmd(cb)('ffmpeg -i ' + filename + ' image%d.' + format) : formatError();
  });
});

// TODO: More options here
var convertToAudio = exports.convertToAudio = (0, _util.curry)(function (filename, output, format, cb) {
  var arr = ['wav', 'mp3', 'aac', 'ogg'];
  return _ramdaFantasy.Maybe.of(format.toLowerCase()).map((0, _util.includes)(arr)).map(function (x) {
    return x ? executeCmd(cb)('ffmpeg -i ' + filename + ' -vn -ar 44100 -ac 2 -ab 256 -f ' + format + ' ' + output + '.' + format) : formatError();
  });
});

var convertToVideo = exports.convertToVideo = (0, _util.curry)(function (filename, options, output, format, cb) {
  var arr = ['mov', 'mp4', 'avi', 'mkv'];
  return _ramdaFantasy.Maybe.of(format.toLowerCase()).map((0, _util.includes)(arr)).map(function (x) {
    return (
      // TODO: Some options may need commas so makeOptions might break aspect ratio filters.
      x ? executeCmd(cb)('ffmpeg -i ' + filename + ' ' + (0, _util.makeOptions)(options) + ' ' + output + '.' + format) : formatError()
    );
  });
});

var concatVideo = exports.concatVideo = (0, _util.curry)(function (inputs, output, format, cb) {
  return executeCmd(cb)('ffmpeg ' + (0, _util.makeOptions)(inputs) + ' -y -filter_complex concat=n=' + inputs.length + ':v=1:a=1 ' + output + '.' + format);
});