# Firevad - Voice Activity Detector for Firefox Browser Add-Ons
 
Forked from the ricky0123/vad project, this package prompts the user for microphone permissions and run callbacks on segments of audio with user speech. This package has been adapted to specifically run on Firefox Browser Add-Ons. If you want to detect voice via Chrome Extensions or elsewhere, it is recommended to use the original project.

Firevad has a modified 'web' package, and is different from the original vad in the following ways:
 - the MicVAD object does not pass in a third parameter when creating the AudioWorkletNode
 - the Processor class found in the worklet.js (and therefore in the worklet bundle) uses a hard-coded value for 'targetFrameSize', instead of using the 'framesamples' parameter
 - the MicVAD class uses a custom model fetcher to ensure that the returned model is of type ArrayBuffer
 - the MicVAD class has been altered to ensure that frame objects are of type Float32Array
 - the onnxruntime-web dependency has been updated


## Configuration:
 - copy the following files into your extension's 'public' directory
  - ort-wasm-simd-threaded.mjs (available from the onnx-runtime package) 
  - vad.worklet.bundle.min.js (available from this package's /dist directory)
  - silero_vad.onnx to the /public (available from this package's root directory)
 
 - you must specify the worklet URL when creating the MicVAD object, which should point to the worklet bundle file in the public directory
 - you must specify the 'ort' configuration that points to your public directory


## Quick start:
```typescript
import { MicVAD, RealTimeVADOptions } from "@jcrawley_dev/firevad";
import { ONNXRuntimeAPI } from "@jcrawley_dev/firevad/dist/_common";

let stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        channelCount: 1,
        echoCancellation: true,
        autoGainControl: true,
        noiseSuppression: true,
      },
    });

const options = {
    workletURL: chrome.runtime.getURL('public/vad.worklet.bundle.min.js'),
    ortConfig: (ort: ONNXRuntimeAPI) => { 
        ort.env.wasm.wasmPaths = chrome.runtime.getURL('public/');
    },
    positiveSpeechThreshold: 0.8,
    minSpeechFrames: 3,
    preSpeechPadFrames: 10,
    onSpeechStart: () => {
        console.log("Speech started");
        speechStartTime = Date.now();
        EventBus.emit("saypi:userSpeaking");
    },
    onSpeechEnd: (rawAudioData: Float32Array) => {
        // your code here
    },
    onVADMisfire: () => {
        // your code here
    },
    onFrameProcessed(probabilities: { isSpeech: number; notSpeech: number }) { 
        // your code here
    },
};

let mic = await MicVAD.new(options);
mic.start();
```

## Sponsorship
Please contribute to the original VAD project financially - especially if your commercial product relies on this package. [![Become a Sponsor](https://img.shields.io/static/v1?label=Become%20a%20Sponsor&message=%E2%9D%A4&logo=GitHub&style=flat&color=d42f2d)](https://github.com/sponsors/ricky0123

For more information on the original project: [vad.ricky0123.com](https://www.vad.ricky0123.com).