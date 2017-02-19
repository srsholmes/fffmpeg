import test from 'tape';
import { randomString, makeOptions, includes } from '../src/util';
import {
  convertToVideo,
  convertToImages,
  convertToAudio,
  concatVideo
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

const NUMBER_INPUT = 100;
const STRING_INPUT = 'test';

const tests = {
  startTime: { func: startTime, expected: ` -ss 100`, input: NUMBER_INPUT },
  duration: { func: duration, expected: ` -t 100`, input: NUMBER_INPUT },
  framesPerSecond: { func: framesPerSecond, expected: ` -r 100`, input: NUMBER_INPUT },
  muteVideo: { func: muteVideo, expected: ` -an`, input: NUMBER_INPUT },
  changeVolume: { func: changeVolume, expected: `-af 'volume=100'`, input: NUMBER_INPUT },
  setVideoSpeed: { func: setVideoSpeed, expected: ` -filter:v "setpts=100*PTS"`, input: NUMBER_INPUT },
  setAudioSpeed: { func: setAudioSpeed, expected: ` -filter:a "atempo=100"`, input: NUMBER_INPUT },
  loopVideo: { func: loopVideo, expected: ` -loop 100`, input: NUMBER_INPUT },
  setAudioCodec: { func: setAudioCodec, expected: `-acodec test`, input: STRING_INPUT },
  setVideoCodec: { func: setVideoCodec, expected: `-vcodec test`, input: STRING_INPUT },
  setAudioBitrate: { func: setAudioBitrate, expected: ` -b:a 100k`, input: NUMBER_INPUT },
  setVideoBitrate: { func: setVideoBitrate, expected: ` -b:v 100k`, input: NUMBER_INPUT },
  setVariableBitrate: { func: setVariableBitrate, expected:  ` - vbr 100`, input: NUMBER_INPUT },
  //setVideoSize: { func: setVideoSize, expected: `hello`, input: 100 }
};

test('addInput', t => {
  t.plan(2);
  const expected = `options -i input`;
  t.deepEquals(addInput('options', 'input'), expected, 'addInput should return the correct string');
  t.deepEquals(typeof addInput('options'), 'function', 'addInput should be curried');
});

test('setBitrate', t => {
  t.plan(2);
  const expected = ` -b:a 100k`;
  t.deepEquals(setBitrate('a')('100'), expected, 'setBitrate should return the correct string');
  t.deepEquals(typeof setBitrate('a'), 'function', 'setBitrate should be curried');
});

test('setCodec', t => {
  t.plan(2);
  const expected = `-acodec test`;
  t.deepEquals(setCodec('a')('test'), expected, 'setCodec should return the correct string');
  t.deepEquals(typeof setCodec('a'), 'function', 'setCodec should be curried');
});

test('setCreationTime', t => {
  t.plan(2);
  t.deepEquals(setCreationTime(100), ` -metadata creation_time="100"`, 'setCreationTime should return the correct string');
  t.deepEquals(/\d{12}/.test(setCreationTime()), true, 'setCreationTime should return the Date.now() if no time is specified');
  //t.deepEquals(/\s-metadata\screation_time="\d{12}"/.test(setCreationTime()), true, 'setCreationTime should return the Date.now() if no time is specified');
});

test('setMetaData', t => {
  t.plan(3);
  t.deepEquals(setMetaData('flag')('data'),` -metadata flag="data"` , 'setMetaData should return the correct string');
  t.deepEquals(
    setMetaData([ ['flag', 'data'], ['flag2', 'data2'] ]),
    ' -metadata flag="data" -metadata flag2="data2"' ,
    'setMetaData should return the correct string if given an array'
  );
  t.deepEquals(typeof setMetaData('a'), 'function', 'setMetaData should be curried if a string is passed in');
});

test('option strings', t => {
	t.plan(Object.keys(tests).length);
  Object.entries(tests).forEach(([ k, { func, expected, input } ]) => t.deepEquals(func(input), expected, `${k} should return the correct string`));
});


export const callback = (err, stdout, stderr) => {
  if (err) console.error('There was an error: ', err);
  console.log('stderr', stderr);
  //console.log('stdout', stdout);
};

//convertToVideo('demo.mp4', '-t 3', 'functionalTest', 'mp4', callback);
//convertToVideo('demo.mp4', duration(3) , randomString(), 'mp4', callback);
//convertToImages('demo.mp4', 'jpg', callback);
//convertToAudio('demo.mp4', duration(3), randomString(), 'mp3', callback);
const multi2 = [
  addInput([ startTime(2), duration(1) ], 'demo.mp4'),
  addInput([ startTime(5), duration(2) ], 'demo.mp4'),
  addInput([ startTime(3), duration(1) ], 'demo.mp4'),
  addInput([ startTime(4), duration(3) ], 'demo.mp4')
];
concatVideo(multi2, 'funcConcat', 'mp4', callback);


//test('Test ffmpeg function', t => {
//  t.plan(1);
//  const cmd = probeVideo(demoName);
//  console.log(cmd)
//  t.deepEquals(true, true, 'true equals true');
//});
