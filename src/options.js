/* @flow */
import { includes, curry, compose, makeOptions } from './util';

// Methods for modifying video.
// add Inputs for multiple video sources
const addInput = curry((opts, input) => `${opts} -i ${input}`);

// Time
const startTime = time => ` -ss ${time}`;
const duration = duration => ` -t ${duration}`;
const framesPerSecond = fps => ` -r ${fps}`;

// Sound
const muteVideo = () => ` -an`;
const changeVolume = vol => `-af 'volume=${vol}'`;

// Scaling
const setVideoSize = (w, h) => {
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
const setVideoSpeed = val => ` -filter:v "setpts=${val}*PTS"`;
const setAudioSpeed = val => ` -filter:a "atempo=${val}"`;
const loopVideo = val => ` -loop ${val}`;

// Codecs
const setCodec = type => codec => `-${type}codec ${codec}`;
const setAudioCodec = setCodec('a');
const setVideoCodec = setCodec('v');

// Bitrate
const setBitrate = type => rate => ` -b:${type} ${rate}k`;
const setAudioBitrate = setBitrate('a');
const setVideoBitrate = setBitrate('v');
const setVariableBitrate = val => ` - vbr ${val}`

// Metadata
const setMetaData = flag => {
  const metaDataFlag = (flag, data) => ` -metadata ${flag}="${data}"`;
  return Array.isArray(flag)
    ? makeOptions(flag.map(([ a, b ]) => metaDataFlag(a, b)))
    : data => metaDataFlag(flag, data);
};

const setCreationTime = (time = Date.now().toString()) => setMetaData('creation_time')(time);

export {
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
}
