let ffmpeg = "ffmpeg";

let inputFlag = "-i";

let addInput = (input, options) => {j|$options $inputFlag $input|j};

let overwriteVideo = (opt) => Js.to_bool(opt) ? " -y" : " -n";

let maxFileSize = (opt) => " -fs " ++ opt;

let frames = (sort, frameType) => " -" ++ sort ++ "frames" ++ " " ++ frameType;

let videoFrames = frames("v");

let audioFrames = frames("a");

let startTime = (time) => " -ss " ++ time;

let seek = startTime;

let duration = (time) => " -t " ++ time;

let framesPerSecond = (fps) => " -r " ++ fps;

let disable = (opt, ()) => " -" ++ opt ++ "n";

let disableVideo = disable("v");

let disableAudio = disable("a");

let muteVideo = () => disableAudio();

let volume = (vol) => {j|-af 'volume=$(vol)'|j};

let setVideoSpeed = (speed) => {j| -filter:v "setpts=$(speed)*PTS"|j};

let setAudioSpeed = (speed) => {j| -filter:a "atempo=$(speed)"|j};

let setCodec = (aV, codec) => "-" ++ aV ++ "codec " ++ codec;

let setAudioCodec = setCodec("a");

let setVideoCodec = setCodec("v");

let setBitrate = (aV, codec) => " -b:" ++ aV ++ " " ++ codec ++ "k";

let setVideoBitrate = setBitrate("v");

let setAudioBitrate = setBitrate("a");

let setVariableBitrate = (vbr) => " - vbr " ++ vbr;

let metaDataFlag = (flag, data) => {j|-metadata "$(flag)=$(data)"|j};
/* Can Use Js.typeof */
/* Js.typeof */