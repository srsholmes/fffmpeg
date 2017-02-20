'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCreationTime = exports.setMetaData = exports.setVariableBitrate = exports.setVideoBitrate = exports.setAudioBitrate = exports.setBitrate = exports.setVideoCodec = exports.setAudioCodec = exports.setCodec = exports.loopVideo = exports.setAudioSpeed = exports.setVideoSpeed = exports.setVideoSize = exports.changeVolume = exports.muteVideo = exports.disableAudio = exports.disableVideo = exports.disable = exports.framesPerSecond = exports.duration = exports.startTime = exports.audioFrames = exports.videoFrames = exports.frames = exports.maxFileSize = exports.overwriteVideo = exports.addInput = exports.INPUT = exports.FFMPEG = exports.convertToGif = exports.concatVideo = exports.convertToAudio = exports.convertToImages = exports.convertToVideo = undefined;

var _commands = require('./commands');

var _options = require('./options');

require('babel-register');
require('babel-polyfill');

exports.convertToVideo = _commands.convertToVideo;
exports.convertToImages = _commands.convertToImages;
exports.convertToAudio = _commands.convertToAudio;
exports.concatVideo = _commands.concatVideo;
exports.convertToGif = _commands.convertToGif;
exports.FFMPEG = _options.FFMPEG;
exports.INPUT = _options.INPUT;
exports.addInput = _options.addInput;
exports.overwriteVideo = _options.overwriteVideo;
exports.maxFileSize = _options.maxFileSize;
exports.frames = _options.frames;
exports.videoFrames = _options.videoFrames;
exports.audioFrames = _options.audioFrames;
exports.startTime = _options.startTime;
exports.duration = _options.duration;
exports.framesPerSecond = _options.framesPerSecond;
exports.disable = _options.disable;
exports.disableVideo = _options.disableVideo;
exports.disableAudio = _options.disableAudio;
exports.muteVideo = _options.muteVideo;
exports.changeVolume = _options.changeVolume;
exports.setVideoSize = _options.setVideoSize;
exports.setVideoSpeed = _options.setVideoSpeed;
exports.setAudioSpeed = _options.setAudioSpeed;
exports.loopVideo = _options.loopVideo;
exports.setCodec = _options.setCodec;
exports.setAudioCodec = _options.setAudioCodec;
exports.setVideoCodec = _options.setVideoCodec;
exports.setBitrate = _options.setBitrate;
exports.setAudioBitrate = _options.setAudioBitrate;
exports.setVideoBitrate = _options.setVideoBitrate;
exports.setVariableBitrate = _options.setVariableBitrate;
exports.setMetaData = _options.setMetaData;
exports.setCreationTime = _options.setCreationTime;