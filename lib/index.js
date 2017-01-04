'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertToAudio = exports.convertToImages = exports.convertVideo = exports.convertCmd = exports.executeCmd = exports.demoName = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _util = require('./util');

var _ramdaFantasy = require('ramda-fantasy');

require('babel-register');
require('babel-polyfill');


var str = 'hello world!';
console.log(str);

var child = require('child_process');
var demoName = exports.demoName = 'demo.mp4';
var K = function K(fn) {
  return function (x) {
    return fn(x), x;
  };
};
var randomString = function randomString() {
  return Math.random().toString(36).substr(2, 5);
};

var callback = function callback(err, stdout, stderr) {
  if (err) console.error('There was an error: ', err);
  console.log('stderr', stderr);
};

// Methods for constructing the command to send to ffmpeg.
var includes = (0, _util.curry)(function (arr, val) {
  return arr.includes(val);
});
var executeCmd = (0, _util.curry)(function (cb, cmd) {
  return child.exec(cmd, cb);
});
var convertCmd = (0, _util.curry)(function (input, options, output) {
  return 'ffmpeg ' + input + ' ' + options + ' ' + output;
});
var makeOptions = function makeOptions(arr) {
  return arr.reduce(function (a, b) {
    return a.concat(b);
  }, '').replace(/,/g, '');
};

// Erro handling
var requiredError = function requiredError(val) {
  throw new Error('Please provide a value for ' + val);
};

var error = function error() {
  throw new Error('Please provide a valid output format');
};
// Methods for modifying video.
var addInput = (0, _util.curry)(function (opts, input) {
  return opts + ' -i ' + input;
});

// TODO: Make this nicer, change the functions before exporting and give them required error funcs
var startTime = function startTime() {
  var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : requiredError('time');
  return ' -ss ' + time;
};
var duration = function duration() {
  var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : requiredError('time');
  return ' -t ' + duration;
};
var muteVideo = function muteVideo() {
  return ' -an';
};
var framesPerSecond = function framesPerSecond() {
  var fps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : requiredError('fps');
  return ' -r ' + fps;
};
var changeVolume = function changeVolume() {
  var vol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : requiredError('volume');
  return '-af \'volume=' + vol + '\'';
};
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

// Bitrates
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

// TODO: Remove the curry and manually curry if flag is a string.
// TEST this.
var setMetaData = function setMetaData(flag) {
  var metaDataFlag = function metaDataFlag(flag, data) {
    return ' -metadata ' + flag + '="' + data + '"';
  };
  return Array.isArray(flag) ? makeOptions(flag.map(function (_ref) {
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
  return setMetaData('creation_time', time);
};

// TODO: Change these to Either monad?

var convertToImages = (0, _util.curry)(function (filename, format, cb) {
  var arr = ['pgm', 'ppm', 'pam', 'pgmyuv', 'jpeg', 'jpg', 'gif', 'png', 'tiff', 'sgi'];
  return _ramdaFantasy.Maybe.of(format.toLowerCase()).map(includes(arr)).map(function (x) {
    return x ? executeCmd(cb)('ffmpeg -i ' + filename + ' image%d.' + format) : error();
  });
});

// TODO: More options here
var convertToAudio = (0, _util.curry)(function (filename, output, format, cb) {
  var arr = ['wav', 'mp3', 'aac', 'ogg'];
  return _ramdaFantasy.Maybe.of(format.toLowerCase()).map(includes(arr)).map(function (x) {
    return x ? executeCmd(cb)('ffmpeg -i ' + filename + ' -vn -ar 44100 -ac 2 -ab 256 -f ' + format + ' ' + output + '.' + format) : error();
  });
});

var convertVideo = (0, _util.curry)(function (filename, options, output, format, cb) {
  var arr = ['mov', 'mp4', 'avi', 'mkv'];
  return _ramdaFantasy.Maybe.of(format.toLowerCase()).map(includes(arr)).map(function (x) {
    return (
      // TODO: Some options may need commas so makeOptions might break aspect ratio filters.
      x ? executeCmd(cb)('ffmpeg -i ' + filename + ' ' + makeOptions(options) + ' ' + output + '.' + format) : error()
    );
  });
});

var concatVideo = (0, _util.curry)(function (inputs, output, format, cb) {
  return executeCmd(cb)('ffmpeg ' + makeOptions(inputs) + ' -y -filter_complex concat=n=' + inputs.length + ':v=1:a=1 ' + output + '.' + format);
});

var multi2 = [addInput([startTime(2), duration(1)], demoName), addInput([startTime(5), duration(2)], demoName), addInput([startTime(3), duration(1)], demoName), addInput([startTime(4), duration(3)], demoName)];

var options = [setVideoSize(100, 200)];

//convertVideo(demoName, options, randomString(), 'mp4', callback);
//convertToImages(demoName, 'jpg', callback);
//convertToAudio(demoName, 'output', 'mp3', callback);
//concatVideo(multi2, 'concatTest', 'mp4', callback);

// TODO: Look into outputting as streams for input to the next input allowing composition of videos
// TODO: Fix bug if video already exists.

exports.executeCmd = executeCmd;
exports.convertCmd = convertCmd;
exports.convertVideo = convertVideo;
exports.convertToImages = convertToImages;
exports.convertToAudio = convertToAudio;