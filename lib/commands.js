'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertToAudio = exports.convertToImages = exports.convertToVideo = exports.concatVideo = exports.executeCmd = undefined;

var _util = require('./util');

var _options = require('./options');

var _constants = require('./constants');

var child = require('child_process');
// Methods for constructing the command to send to ffmpeg.
var executeCmd = exports.executeCmd = (0, _util.curry)(function (cb, cmd) {
  return child.exec(cmd, cb);
});

var converter = function converter(type) {
  return function (arr) {
    return (0, _util.curry)(function (filename, options, outputFile, format, cb) {
      (0, _util.compose)(executeCmd(cb), (0, _util.K)(console.log), (0, _util.concatString)(_options.FFMPEG), (0, _util.concatString)(_options.INPUT), (0, _util.concatString)(filename),
      //x => type === 'sound' ? concatString('-vn')(x) : x,
      (0, _util.concatString)((0, _util.makeOptions)(options)), (0, _util.makeFileName)(outputFile), (0, _util.includedFormat)(arr), _util.toLowerCase)(format);
    });
  };
};

var concatConverter = function concatConverter(arr) {
  return (0, _util.curry)(function (inputs, output, format, cb) {
    (0, _util.compose)(executeCmd(cb), (0, _util.K)(console.log), (0, _util.concatString)(_options.FFMPEG), (0, _util.concatString)((0, _util.makeOptions)(inputs)), (0, _util.concatString)('-y'), (0, _util.concatString)('-filter_complex concat=n=' + inputs.length + ':v=1:a=1'), (0, _util.makeFileName)(output), (0, _util.includedFormat)(arr), _util.toLowerCase)(format);
  });
};

var concatVideo = exports.concatVideo = concatConverter(_constants.VIDEO_FILE_TYPES);
var convertToVideo = exports.convertToVideo = converter('video')(_constants.VIDEO_FILE_TYPES);
var convertToImages = exports.convertToImages = (0, _util.curry)(function (filename, format, cb) {
  return converter('image')(_constants.IMAGE_FILE_TYPES)(filename, [], 'image%d', format, cb);
});
var convertToAudio = exports.convertToAudio = converter('sound')(_constants.SOUND_FILE_TYPES);