const {
  convertToVideo,
  convertToImages,
  convertToAudio,
  concatVideo,
  convertToGif,
  ffmpeg,
  inputFlag,
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
  volume,
  setVideoSize,
  setVideoSpeed,
  setAudioSpeed,
  setCodec,
  setAudioCodec,
  setVideoCodec,
  setBitrate,
  setAudioBitrate,
  setVideoBitrate,
  setVariableBitrate,
  setMetaData,
  setCreationTime
} = require("../src");

const NUMBER_INPUT = 100;
const STRING_INPUT = "test";

const tests = {
  startTime: { func: startTime, expected: ` -ss 100`, input: NUMBER_INPUT },
  duration: { func: duration, expected: ` -t 100`, input: NUMBER_INPUT },
  framesPerSecond: {
    func: framesPerSecond,
    expected: ` -r 100`,
    input: NUMBER_INPUT
  },
  muteVideo: { func: muteVideo, expected: ` -an`, input: NUMBER_INPUT },
  changeVolume: {
    func: volume,
    expected: `-af 'volume=100'`,
    input: NUMBER_INPUT
  },
  setVideoSpeed: {
    func: setVideoSpeed,
    expected: ` -filter:v "setpts=100*PTS"`,
    input: NUMBER_INPUT
  },
  setAudioSpeed: {
    func: setAudioSpeed,
    expected: ` -filter:a "atempo=100"`,
    input: NUMBER_INPUT
  },
  setAudioCodec: {
    func: setAudioCodec,
    expected: `-acodec test`,
    input: STRING_INPUT
  },
  setVideoCodec: {
    func: setVideoCodec,
    expected: `-vcodec test`,
    input: STRING_INPUT
  },
  setAudioBitrate: {
    func: setAudioBitrate,
    expected: ` -b:a 100k`,
    input: NUMBER_INPUT
  },
  setVideoBitrate: {
    func: setVideoBitrate,
    expected: ` -b:v 100k`,
    input: NUMBER_INPUT
  },
  setVariableBitrate: {
    func: setVariableBitrate,
    expected: ` - vbr 100`,
    input: NUMBER_INPUT
  },
  maxFileSize: { func: maxFileSize, expected: ` -fs 100`, input: NUMBER_INPUT },
  videoFrames: {
    func: videoFrames,
    expected: ` -vframes 100`,
    input: NUMBER_INPUT
  },
  audioFrames: {
    func: audioFrames,
    expected: ` -aframes 100`,
    input: NUMBER_INPUT
  }
  //setVideoSize: { func: setVideoSize, expected: `hello`, input: 100 }
};

test("FFMPEG", () => {
  expect(ffmpeg).toEqual("ffmpeg");
});

test("INPUT", () => {
  expect(inputFlag).toEqual("-i");
});

test("addInput", () => {
  const expected = "options -i input";
  expect(addInput("input", "options")).toEqual(expected);
});

test("frames", () => {
  const expected = ` -optionsframes input`;
  expect(frames("options", "input")).toEqual(expected);
});

test("overwriteVideo", () => {
  expect.assertions(2);
  const expected = ` -y`;
  expect(overwriteVideo(true)).toEqual(expected);
  expect(overwriteVideo(false)).toEqual(" -n");
});

test("disable", () => {
  const expected = ` -an`;
  expect(disable("a")).toEqual(expected);
  expect(disableAudio()).toEqual(expected);
  expect(disableVideo()).toEqual(" -vn");
});

test("setBitrate", () => {
  const expected = ` -b:a 100k`;
  expect(setBitrate("a", "100")).toEqual(expected);
});

test("setCodec", () => {
  const expected = `-acodec test`;
  expect(setCodec("a", "test")).toEqual(expected);
});

test("setCreationTime", () => {
  expect(setCreationTime(100)).toEqual(` -metadata creation_time="100"`);
  // expect(/\d{12}/.test(setCreationTime())).toEqual(true);
  //t.deepEquals(/\s-metadata\screation_time="\d{12}"/.test(setCreationTime()), true, 'setCreationTime should return
  // the Date.now() if no time is specified');
});

test("setMetaData", () => {
  // expect(setMetaData("flag", "data")).toEqual(` -metadata flag="data"`);
  expect(setMetaData([["flag", "data"], ["flag2", "data2"]])).toEqual(
    ' -metadata flag="data"  -metadata flag2="data2"'
  );
});

test("option strings", () => {
  Object.entries(tests).forEach(([k, { func, expected, input }]) =>
    expect(func(input)).toEqual(expected)
  );
});

test("convertToVideo", () => {
  const outputFileName = "convertToVideo.mp4";
  convertToVideo(
    "demo.mp4",
    [startTime(2), duration(4)],
    `${outputFileName}`
  ).then(x =>
    expect(x.spawnargs[2]).toEqual(
      `ffmpeg -i demo.mp4 ${startTime(2)}${duration(4)} ${outputFileName}`
    )
  );
});

test("convertToAudio", () => {
  const outputFileName = "convertToVideo.mp3";
  convertToAudio(
    "demo.mp4",
    [startTime(2), duration(4)],
    `${outputFileName}`
  ).then(x =>
    expect(x.spawnargs[2]).toEqual(
      `ffmpeg -i demo.mp4 ${startTime(2)}${duration(4)} ${outputFileName}`
    )
  );
});

test("concatVideo", () => {
  const outputFileName = "concatVideo.mp4";
  const multipleInputs = [
    addInput("demo.mp4", [startTime(2), duration(1)]),
    addInput("demo.mp4", [startTime(5), duration(2)])
  ];
  concatVideo(multipleInputs, `${outputFileName}`).then(x =>
    expect(x.spawnargs[2]).toEqual(
      `ffmpeg -ss 2 -t 1 -i demo.mp4 -ss 5 -t 2 -i demo.mp4 -y -filter_complex concat=n=2:v=1:a=1 concatVideo.mp4`
    )
  );
});

test("convertToImages", () => {
  convertToImages("demo.mp4", duration(3)).then(x =>
    expect(x.spawnargs[2]).toEqual(`ffmpeg -i demo.mp4  -t 3 image%d.png`)
  );
});

test("convertToGif", () => {
  const outputFileName = "convertToGif";
  convertToGif("demo.mp4", duration(3), `${outputFileName}`).then(x =>
    expect(x.spawnargs[2]).toEqual(`ffmpeg -i demo.mp4  -t 3 convertToGif.gif`)
  );
});
