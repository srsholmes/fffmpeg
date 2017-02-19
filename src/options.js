/* @flow */
import { curry, makeOptions } from './util';

const FFMPEG = `ffmpeg`;
const INPUT = `-i`;

// Methods for modifying video.
// add Inputs for multiple video sources
const addInput = curry((opts, input) => `${opts} ${INPUT} ${input}`);

type OptionInput = string | number;
// Time
const startTime = (time: OptionInput) => ` -ss ${time}`;
const duration = (duration: OptionInput) => ` -t ${duration}`;
const framesPerSecond = (fps: OptionInput) => ` -r ${fps}`;

// Sound
const muteVideo = () => ` -an`;
const changeVolume = (vol: OptionInput) => `-af 'volume=${vol}'`;

// Scaling
const setVideoSize = (w: OptionInput, h: OptionInput) => {
  // TODO: work out different ways to scale video, e.g. X/Y coordinate, percentage
  // See https://trac.ffmpeg.org/wiki/Scaling%20(resizing)%20with%20ffmpeg

  // If two numbers, set pixel size
  return ` -vf scale=${w}:${h}`;

  // If 'scale', scale both:
  //return ` -vf scale=iw*${x}:ih*${x}`;

  // If string 'half'
  //return ` -vf scale=iw*.5:ih*.5`;

  // If string 'double'
  //return ` -vf scale=iw*2:ih*2`;

}

// Speed
const setVideoSpeed = (val: OptionInput) => ` -filter:v "setpts=${val}*PTS"`;
const setAudioSpeed = (val: OptionInput) => ` -filter:a "atempo=${val}"`;
const loopVideo = (val: OptionInput) => ` -loop ${val}`;

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
const setMetaData = (flag: Metadata) => {
  const metaDataFlag = (flag: string, data: string) => ` -metadata ${flag}="${data}"`;
  return Array.isArray(flag)
    ? makeOptions(flag.map(([ a, b ]) => metaDataFlag(a, b)))
    : (data: string) => metaDataFlag(flag, data);
};

const setCreationTime = (time: string = Date.now().toString()) => setMetaData('creation_time')(time);

export {
  FFMPEG,
  INPUT,
  addInput,
  startTime,
  duration,
  framesPerSecond,
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
