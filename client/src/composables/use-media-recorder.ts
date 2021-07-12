import { ref } from "vue";

// handles interfacing with the MediaStream Recording API, as a Vue composable
export default function useMediaRecorder() {
  const isReadyToRecord = ref(false);
  const recordedAudio = ref(null as Blob | null);

  let chunks = [] as Blob[];
  let recorder = null as MediaRecorder | null;

  // create a media recorder (will prompt the user for permissions)
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (event) => {
          chunks.push(event.data);
        };

        recorder.onstop = () => {
          recordedAudio.value = new Blob(chunks, {
            type: "audio/ogg; codecs=opus",
          });

          chunks = [];
        };

        isReadyToRecord.value = true;
      });
  } else {
    console.error("sorry, media recording isn't supported on this browser");
  }

  const startMediaRecorder = () => {
    if (recorder !== null) {
      recorder.start();
    }
  };

  const stopMediaRecorder = () => {
    if (recorder !== null) {
      recorder.stop();
    }
  };

  return {
    isReadyToRecord, // whether the media recorder is ready
    recordedAudio, // the recorded audio from the last pair of start/stop method calls
    startMediaRecorder, // starts the media recorder
    stopMediaRecorder, // stops the media recorder
  };
}
