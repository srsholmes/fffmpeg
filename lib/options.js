'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCreationTime = exports.setMetaData = exports.setVariableBitrate = exports.setVideoBitrate = exports.setAudioBitrate = exports.setBitrate = exports.setVideoCodec = exports.setAudioCodec = exports.setCodec = exports.loopVideo = exports.setAudioSpeed = exports.setVideoSpeed = exports.setVideoSize = exports.changeVolume = exports.muteVideo = exports.framesPerSecond = exports.duration = exports.startTime = exports.addInput = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _util = require('./util');

// Methods for modifying video.
var addInput = (0, _util.curry)(function (opts, input) {
  return opts + ' -i ' + input;
});

// Time
var startTime = function startTime(time) {
  return ' -ss ' + time;
};
var duration = function duration(_duration) {
  return ' -t ' + _duration;
};
var framesPerSecond = function framesPerSecond(fps) {
  return ' -r ' + fps;
};

// Sound
var muteVideo = function muteVideo() {
  return ' -an';
};
var changeVolume = function changeVolume(vol) {
  return '-af \'volume=' + vol + '\'';
};

// Scaling
var setVideoSize = function setVideoSize(w, h) {
  // TODO: work out different ways to scale video, e.g. X/Y coordinate, percentage
  // See https://trac.ffmpeg.org/wiki/Scaling%20(resizing)%20with%20ffmpeg

  // If two numbers, set pixel size
  return ' -vf scale=' + w + ':' + h;

  // If 'scale', scale both:
  //return ` -vf scale=iw*${x}:ih*${x}`;

  // If string 'half'
  //return ` -vf scale=iw*.5:ih*.5`;

  // If string 'double'
  //return ` -vf scale=iw*2:ih*2`;
};

// Speeds
var setVideoSpeed = function setVideoSpeed(val) {
  return ' -filter:v "setpts=' + val + '*PTS"';
};
var setAudioSpeed = function setAudioSpeed(val) {
  return ' -filter:a "atempo=' + val + '"';
};
var loopVideo = function loopVideo(val) {
  return ' -loop ' + val;
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

exports.addInput = addInput;
exports.startTime = startTime;
exports.duration = duration;
exports.framesPerSecond = framesPerSecond;
exports.muteVideo = muteVideo;
exports.changeVolume = changeVolume;
exports.setVideoSize = setVideoSize;
exports.setVideoSpeed = setVideoSpeed;
exports.setAudioSpeed = setAudioSpeed;
exports.loopVideo = loopVideo;
exports.setCodec = setCodec;
exports.setAudioCodec = setAudioCodec;
exports.setVideoCodec = setVideoCodec;
exports.setBitrate = setBitrate;
exports.setAudioBitrate = setAudioBitrate;
exports.setVideoBitrate = setVideoBitrate;
exports.setVariableBitrate = setVariableBitrate;
exports.setMetaData = setMetaData;
exports.setCreationTime = setCreationTime;