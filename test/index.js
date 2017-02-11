import test from 'tape';
import { randomString, makeOptions, includes } from '../src/util';
import {
  executeCmd,
  convertCmd,
  convertToImages,
  convertToAudio,
  convertToVideo,
  concatVideo,
} from '../src';
import {
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
} from '../src/options';

const tests = {
  startTime: { func: startTime, expected: ` -ss 100`, input: 100 },
  duration: { func: duration, expected: ` -t 100`, input: 100 },
  framesPerSecond: { func: framesPerSecond, expected: ` -r 100`, input: 100 },
  muteVideo: { func: muteVideo, expected: ` -an`, input: 100 },
  changeVolume: { func: changeVolume, expected: `-af 'volume=100'`, input: 100 },
  setVideoSpeed: { func: setVideoSpeed, expected: ` -filter:v "setpts=100*PTS"`, input: 100 },
  setAudioSpeed: { func: setAudioSpeed, expected: ` -filter:a "atempo=100"`, input: 100 },
  loopVideo: { func: loopVideo, expected: ` -loop 100`, input: 100 },
  setAudioCodec: { func: setAudioCodec, expected: `-acodec hello`, input: 'hello' },
  setVideoCodec: { func: setVideoCodec, expected: `-vcodec hello`, input: 'hello' },
  setAudioBitrate: { func: setAudioBitrate, expected: ` -b:a 100k`, input: 100 },
  setVideoBitrate: { func: setVideoBitrate, expected: ` -b:v 100k`, input: 100 },
  setVariableBitrate: { func: setVariableBitrate, expected:  ` - vbr 100`, input: 100 },
  //addInput: { func: addInput, expected: `options -i input`, input: ['options', 'input'] },
  //setCreationTime: { func: setCreationTime, expected: ` -metadata creation_time="100"`, input: 100 },
  //setVideoSize: { func: setVideoSize, expected: `hello`, input: 100 }
  //setCodec: { func: setCodec, expected: `hello`, input: 100 }
  //setBitrate: { func: setBitrate, expected: `hello`, input: 100 }
  //setMetaData: { func: setMetaData, expected: `hello`, input: 100 }
}

test('options', t => {
	t.plan(Object.keys(tests).length);
  Object.entries(tests).forEach(([ k, { func, expected, input } ]) => t.deepEquals(func(input), expected, `${func} should return the correct string`));
});


//export const callback = (err, stdout, stderr) => {
//  if (err) console.error('There was an error: ', err);
//  console.log('stderr', stderr);
//};



//convertToVideo('demo.mp4', [], randomString(), 'mp4', callback);
//convertToImages('demo.mp4', 'jpg', callback);
//convertToAudio('demo.mp4', 'output', 'mp3', callback);
//concatVideo(multi2, 'concatTest', 'mp4', callback);

//const multi2 = [
//  addInput([ startTime(2), duration(1) ], demoName),
//  addInput([ startTime(5), duration(2) ], demoName),
//  addInput([ startTime(3), duration(1) ], demoName),
//  addInput([ startTime(4), duration(3) ], demoName)
//];

//test('Test ffmpeg function', t => {
//  t.plan(1);
//  const cmd = probeVideo(demoName);
//  console.log(cmd)
//  t.deepEquals(true, true, 'true equals true');
//});
