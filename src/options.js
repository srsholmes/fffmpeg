/* @flow */
import { curry, makeOptions } from './util';
type OptionInput = string | number;

const FFMPEG = `ffmpeg`;
const INPUT = `-i`;

// Methods for modifying video.
// add Inputs for multiple video sources
const addInput = curry((opts, input) => `${opts} ${INPUT} ${input}`);

// File Options
const overwriteVideo = (opt: bool): string => ` -${opt === true ? 'y' : 'n'}`;
const maxFileSize = (size: OptionInput): string => ` -fs ${size}`;

// Frames
const frames = (type: string) => (frames: OptionInput): string => ` -${type}frames ${frames}`;
const videoFrames = frames('v');
const audioFrames = frames('a');

// Time
const startTime = (time: OptionInput): string => ` -ss ${time}`;
const duration = (duration: OptionInput): string => ` -t ${duration}`;
const framesPerSecond = (fps: OptionInput): string => ` -r ${fps}`;

const disable = (type: string): string => ` -${type}n`;
const disableVideo = () => disable('v');
const disableAudio = () => disable('a');

// Sound
const muteVideo = () => disableAudio();
const changeVolume = (vol: OptionInput) => `-af 'volume=${vol}'`;

// Scaling
const setVideoSize = (w: OptionInput) => {
  // See https://trac.ffmpeg.org/wiki/Scaling%20(resizing)%20with%20ffmpeg


  // If 'scale', scale both:
  //return ` -vf scale=iw*${x}:ih*${x}`;
  // If string 'half'
  if (w === 'half') {
    return ` -vf scale=iw*.5:ih*.5`;
  }

  if (w === 'double') {
    return ` -vf scale=iw*2:ih*2`;
  }
  // If not a key word, return a function for height. two numbers, set pixel size
  return (h: OptionInput) => {
    return ` -vf scale=${w}:${h}`;
  }
  // TODO: work out different ways to scale video, e.g. X/Y coordinate, percentage

}

// Speed
const setVideoSpeed = (val: OptionInput): string => ` -filter:v "setpts=${val}*PTS"`;
const setAudioSpeed = (val: OptionInput): string => ` -filter:a "atempo=${val}"`;
const loopVideo = (val: OptionInput): string => ` -loop ${val}`;

// Codecs
const setCodec = (type: string) => (codec: OptionInput) => `-${type}codec ${codec}`;
const setAudioCodec = setCodec('a');
const setVideoCodec = setCodec('v');

// Bitrate
const setBitrate = (type: string) => (rate: OptionInput) => ` -b:${type} ${rate}k`;
const setAudioBitrate = setBitrate('a');
const setVideoBitrate = setBitrate('v');
const setVariableBitrate = (val: OptionInput) => ` - vbr ${val}`

//TODO: Fix the flow error...
type Metadata = [ string, string ] | string;
// Metadata
const setMetaData = (flag: Metadata): string => {
  const metaDataFlag = (flag: string, data: string) => ` -metadata ${flag}="${data}"`;
  return Array.isArray(flag)
    ? makeOptions(flag.map(([ a, b ]) => metaDataFlag(a, b)))
    : (data: string) => metaDataFlag(flag, data);
};

const setCreationTime = (time: string = Date.now().toString()): string => setMetaData('creation_time')(time);

export {
  FFMPEG,
  INPUT,
  addInput,
  overwriteVideo,
  maxFileSize,
  frames,
  videoFrames,
  audioFrames,
  startTime,
  duration,
  framesPerSecond,
  disable,
  disableVideo,
  disableAudio,
  muteVideo,
  changeVolume,
  setVideoSize,
  setVideoSpeed,
  setAudioSpeed,
  loopVideo,
  setCodec,
  setAudioCodec,
  setVideoCodec,
  setBitrate,
  setAudioBitrate,
  setVideoBitrate,
  setVariableBitrate,
  setMetaData,
  setCreationTime,
};
