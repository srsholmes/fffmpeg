'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.probeCmd = exports.executeChild = exports.demoName = undefined;

var _lodash = require('lodash.curry');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.compose');

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var child = require('child_process');
var demoName = exports.demoName = 'demo.mp4';
var probeCmd = function probeCmd(filename) {
  return 'ffprobe -show_frames -of compact=p=0 -f lavfi "movie=' + filename + ',select=gt(scene\\,0.4)"';
};

var executeChild = function executeChild(cmd) {
  return child.exec(cmd, function (err, stdout, stderr) {
    console.log('cmd', cmd);
    console.log('err', err);
    console.log('stdout', stdout);
    console.log('stderr', stderr);
  });
};

//const probeVideo = file => compose(executeChild, probeCmd(file))
var two = function two() {
  return 'hello';
};
var one = function one(str) {
  return 'hello ' + str;
};
var test = (0, _lodash4.default)(one, two);
console.log(test);
exports.executeChild = executeChild;
exports.probeCmd = probeCmd;