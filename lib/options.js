'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCreationTime = exports.setMetaData = exports.setVariableBitrate = exports.setVideoBitrate = exports.setAudioBitrate = exports.setBitrate = exports.setVideoCodec = exports.setAudioCodec = exports.setCodec = exports.setAudioSpeed = exports.setVideoSpeed = exports.setVideoSize = exports.volume = exports.muteVideo = exports.disableAudio = exports.disableVideo = exports.disable = exports.framesPerSecond = exports.duration = exports.seek = exports.startTime = exports.audioFrames = exports.videoFrames = exports.frames = exports.maxFileSize = exports.overwriteVideo = exports.addInput = exports.INPUT = exports.FFMPEG = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _util = require('./util');

var FFMPEG = 'ffmpeg';
var INPUT = '-i';

// Methods for modifying video.
// add Inputs for multiple video sources
var addInput = (0, _util.curry)(function (opts, input) {
  return opts + ' ' + INPUT + ' ' + input;
});

// File Options
var overwriteVideo = function overwriteVideo(opt) {
  return ' -' + (opt === true ? 'y' : 'n');
};
var maxFileSize = function maxFileSize(size) {
  return ' -fs ' + size;
};

// Frames
var frames = function frames(type) {
  return function (frames) {
    return ' -' + type + 'frames ' + frames;
  };
};
var videoFrames = frames('v');
var audioFrames = frames('a');

// Time
var startTime = function startTime(time) {
  return ' -ss ' + time;
};
var seek = startTime;
var duration = function duration(_duration) {
  return ' -t ' + _duration;
};
var framesPerSecond = function framesPerSecond(fps) {
  return ' -r ' + fps;
};

var disable = function disable(type) {
  return ' -' + type + 'n';
};
var disableVideo = function disableVideo() {
  return disable('v');
};
var disableAudio = function disableAudio() {
  return disable('a');
};

// Sound
var muteVideo = function muteVideo() {
  return disableAudio();
};
var volume = function volume(vol) {
  return '-af \'volume=' + vol + '\'';
};

// Scaling
var setVideoSize = function setVideoSize(w) {
  // See https://trac.ffmpeg.org/wiki/Scaling%20(resizing)%20with%20ffmpeg


  // If 'scale', scale both:
  //return ` -vf scale=iw*${x}:ih*${x}`;
  // If string 'half'
  if (w === 'half') {
    return ' -vf scale=iw*.5:ih*.5';
  }

  if (w === 'double') {
    return ' -vf scale=iw*2:ih*2';
  }
  // If not a key word, return a function for height. two numbers, set pixel size
  return function (h) {
    return ' -vf scale=' + w + ':' + h;
  };
  // TODO: work out different ways to scale video, e.g. X/Y coordinate, percentage
};

// Speed
var setVideoSpeed = function setVideoSpeed(val) {
  return ' -filter:v "setpts=' + val + '*PTS"';
};
var setAudioSpeed = function setAudioSpeed(val) {
  return ' -filter:a "atempo=' + val + '"';
};

// Codecs
var setCodec = function setCodec(type) {
  return function (codec) {
    return '-' + type + 'codec ' + codec;
  };
};
var setAudioCodec = setCodec('a');
var setVideoCodec = setCodec('v');

// Bitrate
var setBitrate = function setBitrate(type) {
  return function (rate) {
    return ' -b:' + type + ' ' + rate + 'k';
  };
};
var setAudioBitrate = setBitrate('a');
var setVideoBitrate = setBitrate('v');
var setVariableBitrate = function setVariableBitrate(val) {
  return ' - vbr ' + val;
};

//TODO: Fix the flow error...

// Metadata
var setMetaData = function setMetaData(flag) {
  var metaDataFlag = function metaDataFlag(flag, data) {
    return ' -metadata ' + flag + '="' + data + '"';
  };
  return Array.isArray(flag) ? (0, _util.makeOptions)(flag.map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        a = _ref2[0],
        b = _ref2[1];

    return metaDataFlag(a, b);
  })) : function (data) {
    return metaDataFlag(flag, data);
  };
};

var setCreationTime = function setCreationTime() {
  var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Date.now().toString();
  return setMetaData('creation_time')(time);
};

exports.FFMPEG = FFMPEG;
exports.INPUT = INPUT;
exports.addInput = addInput;
exports.overwriteVideo = overwriteVideo;
exports.maxFileSize = maxFileSize;
exports.frames = frames;
exports.videoFrames = videoFrames;
exports.audioFrames = audioFrames;
exports.startTime = startTime;
exports.seek = seek;
exports.duration = duration;
exports.framesPerSecond = framesPerSecond;
exports.disable = disable;
exports.disableVideo = disableVideo;
exports.disableAudio = disableAudio;
exports.muteVideo = muteVideo;
exports.volume = volume;
exports.setVideoSize = setVideoSize;
exports.setVideoSpeed = setVideoSpeed;
exports.setAudioSpeed = setAudioSpeed;
exports.setCodec = setCodec;
exports.setAudioCodec = setAudioCodec;
exports.setVideoCodec = setVideoCodec;
exports.setBitrate = setBitrate;
exports.setAudioBitrate = setAudioBitrate;
exports.setVideoBitrate = setVideoBitrate;
exports.setVariableBitrate = setVariableBitrate;
exports.setMetaData = setMetaData;
exports.setCreationTime = setCreationTime;