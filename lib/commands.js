'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.concatVideo = exports.convertToAudio = exports.convertToGif = exports.convertToImages = exports.convertToVideo = exports.executeCmd = undefined;

var _util = require('./util');

var _options = require('./options');

var _constants = require('./constants');

var child = require('child_process');
// Methods for constructing the command to send to ffmpeg.
var executeCmd = exports.executeCmd = (0, _util.curry)(function (cb, cmd) {
  return child.exec(cmd, cb);
});

var converter = function converter(arr) {
  return (0, _util.curry)(function (inputFile, options, outputFile, format, cb) {
    (0, _util.compose)(executeCmd(cb), (0, _util.K)(console.log), (0, _util.concatWithSpace)(_options.FFMPEG), (0, _util.concatWithSpace)(_options.INPUT), (0, _util.concatWithSpace)(inputFile), (0, _util.concatWithSpace)((0, _util.makeOptions)(options)), (0, _util.makeFileName)(outputFile), (0, _util.includedFormat)(arr), _util.toLowerCase)(format);
  });
};

var concatConverter = function concatConverter(arr) {
  return (0, _util.curry)(function (inputs, outputFile, format, cb) {
    (0, _util.compose)(executeCmd(cb), (0, _util.K)(console.log), (0, _util.concatWithSpace)(_options.FFMPEG), (0, _util.concatWithSpace)((0, _util.makeOptions)(inputs)), (0, _util.concatWithSpace)('-y'), (0, _util.concatWithSpace)('-filter_complex concat=n=' + inputs.length + ':v=1:a=1'), (0, _util.makeFileName)(outputFile), (0, _util.includedFormat)(arr), _util.toLowerCase)(format);
  });
};

var convertToVideo = exports.convertToVideo = converter(_constants.VIDEO_FILE_TYPES);

var convertToImages = exports.convertToImages = (0, _util.curry)(function (inputFile, options, format, cb) {
  return converter(_constants.IMAGE_FILE_TYPES)(inputFile, options, 'image%d', format, cb);
});

var convertToGif = exports.convertToGif = (0, _util.curry)(function (inputFile, options, outputFile, cb) {
  return converter(_constants.IMAGE_FILE_TYPES)(inputFile, options, outputFile, 'gif', cb);
});

var convertToAudio = exports.convertToAudio = converter(_constants.SOUND_FILE_TYPES);

var concatVideo = exports.concatVideo = concatConverter(_constants.VIDEO_FILE_TYPES);