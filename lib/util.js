'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var curry = exports.curry = function curry(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var c = function c(args) {
    return args.length < fn.length ? function () {
      for (var _len2 = arguments.length, _args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        _args[_key2] = arguments[_key2];
      }

      return c([].concat(_toConsumableArray(args), _toConsumableArray(_args)));
    } : fn.apply(undefined, _toConsumableArray(args));
  };
  return c(args);
};

var compose = exports.compose = function compose() {
  for (var _len3 = arguments.length, fns = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    fns[_key3] = arguments[_key3];
  }

  return fns.reduce(function (f, g) {
    return function () {
      return f(g.apply(undefined, arguments));
    };
  });
};

var includes = exports.includes = curry(function (arr, val) {
  return arr.includes(val);
});

var includedFormat = exports.includedFormat = curry(function (arr, val) {
  return includes(arr)(val) ? val : function () {
    throw new Error('Specified format not support');
  };
});

var optionsString = exports.optionsString = function optionsString(arr) {
  return arr.reduce(function (a, b) {
    return a.concat(b);
  }, '').replace(/,/g, '');
};

var makeOptions = exports.makeOptions = function makeOptions(options) {
  return Array.isArray(options) ? optionsString(options) : optionsString([options]);
};

var concatString = exports.concatString = curry(function (a, b) {
  return a + ' ' + b;
});

var makeFileName = exports.makeFileName = curry(function (a, b) {
  return a + '.' + b;
});

var K = exports.K = function K(fn) {
  return function (x) {
    return fn(x), x;
  };
};

var randomString = exports.randomString = function randomString() {
  return Math.random().toString(36).substr(2, 5);
};

var toLowerCase = exports.toLowerCase = function toLowerCase(str) {
  return str.toLowerCase();
};
// Error handling
var requiredError = exports.requiredError = function requiredError(val) {
  throw new Error('Please provide a value for ' + val);
};