# fffmpeg [![Build Status](https://travis-ci.org/srsholmes/fffmpeg.svg?branch=develop)](https://travis-ci.org/srsholmes/fffmpeg) [![Coverage Status](https://coveralls.io/repos/github/srsholmes/fffmpeg/badge.svg?branch=develop)](https://coveralls.io/github/srsholmes/fffmpeg?branch=develop)
### Currently WIP / Experimental. Will probably be very buggy.
A simple to use API for ffmpeg in node.
## Installation:
`npm i fffmpeg`

## Commands:

#### `convertToVideo(inputFile, options, outputFile)`

Parameters:
* inputFile: The input file to be processed.
* options: Options to be processed when encoding the output.
* outputFile: The name of the output file (include the file extension).

#### `convertToImages(inputFile, options)`

Parameters:
* inputFile: The input file to be processed.
* options: Options to be processed when encoding the output.

#### `convertToAudio(inputFile, options, outputFile)`

Parameters:
* inputFile: The input file to be processed.
* options: Options to be processed when encoding the output.
* outputFile: The name of the output file (include the file extension).

#### `concatVideo(inputs, outputFile)`

Parameters:
* inputs: An array of input files to be processed concatenated together. Each input is added using the `addInput` function.
* outputFile: The name of the output file (include the file extension).

#### `convertToGif(inputFile, options, outputFile)`

Parameters:
* inputFile: The input file to be processed.
* options: Options to be processed when encoding the output.
* outputFile: The name of the output file.

## Options:
#### `addInput(inputFile, [options])`
adds an input to be converted. Options is an array of options to be used for that input. Can be used to create outputs with multiple inputs for `concatVideo` function.

e.g.
```
const multipleInputs = [
  addInput('demo.mp4', [ startTime(2), duration(1) ]),
  addInput('demo.mp4', [ startTime(5), duration(2) ]),
];

concatVideo(multipleInputs, `concatVideo.mp4`).then(x => console.log(x));
```

#### `audioFrames(x)`
Set the number of audio frames to output.

#### `volume(x)`
Set the audio volume.

#### `disable(a | v)`
Disable either the audio `(a)` or video `(v)` track

#### `disableAudio`
Disable the audio track;

#### `disableVideo`
Disable the video track;

#### `duration`
Set the duration in seconds.

#### `frames`
Set the number of frames to be rendered.

#### `framesPerSecond`
Set the frames per second.

#### `maxFileSize`
Set the maximum rendered file size. If this option is set and the limit is reached before other options are fulfilled the render will be intercepted.

#### `muteVideo`
Mutes the audio track.

#### `overwriteVideo(true | false)`
If set to true, any files with the same name as the output filename will be overwritten without warning. Defaults to false.

#### `setAudioBitrate(x)`
Sets the audio bitrate.

#### `setAudioCodec`
Sets the audio codec to use. For a list of available codecs use the `seeCodecs('a')` function. NB. `seeCodecs` doesnt exist yet.

#### `setAudioSpeed`
Sets the AudioSpeed

#### `setBitrate`
Sets the Bitrate

#### `setCodec`
Sets the codec

#### `setCreationTime`
Sets the CreationTime

#### `setMetaData(flag)(data)`
Set the metadata for the output. Can either be an array of `flag, data` eg. `[['flag', 'data'], ['flag2', 'data2']]` or called with 2 separate strings as `setMetadata('flag')('data');

#### `setVariableBitrate`
Sets the VariableBitrate

#### `setVideoBitrate`
Sets the bitrate to be used for encoding the video.

#### `setVideoCodec`
Sets the VideoCodec. For a list of available codecs use the `seeCodecs('v')` function. NB. `seeCodecs` doesnt exist yet.

#### `setVideoSize`
Sets the VideoSize

#### `setVideoSpeed`
Sets the speed of the video to be rendered.

#### `startTime(x)`
Sets the start time in seconds as to when to start encoding, alias for `seek`.

#### `seek(x)`
Seek to a time in seconds as to when to start encoding, alias for `startTime`.

#### `videoFrames(x)`
Sets the number of video frames to render.


## TODO:
* Documentation
* Loop video
* Show available codecs
* ~~Audio codec~~
* ~~Audio Bitrate~~
* Audio Channels
* Audio Frequency
* Audio Filters
* ~~Video Codec~~
* ~~Video Bitrate~~
* Video Filters
* Video Frames
* Video frame size
* Video Aspect ratio
* Multiple outputs
* FLV Format to make videos streamable
* Video Presets
* Complex filters




#### TODOs:
* Wrap options with required values
* TODO: Look into outputting as streams for input to the next input allowing composition of videos
* TODO: Fix bug if video already exists.

