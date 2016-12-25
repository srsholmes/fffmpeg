import test from 'tape';
import {
  demoName,
  executeCmd,
  probeCmd,
  probeVideo,
} from '../src';

test('Test ffmpeg function', t => {
  t.plan(1);
  const cmd = probeVideo(demoName);
  console.log(cmd)
  t.deepEquals(true, true, 'true equals true');
});
