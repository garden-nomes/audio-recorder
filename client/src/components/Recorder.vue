<template>
  <div class="recorder">
    <record-timer :start-time="startTime" :stop-time="stopTime" />

    <record-button
      :is-recording="isRecording"
      @start="startRecording"
      @stop="stopRecording"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RecordButton from "./RecordButton.vue";
import RecordTimer from "./RecordTimer.vue";

export default defineComponent({
  name: "Recorder",

  components: { RecordButton, RecordTimer },

  data() {
    return {
      isRecording: false,
      startTime: null as Date | null,
      stopTime: null as Date | null,
      chunks: [] as Blob[],
      recorder: null as MediaRecorder | null,
    };
  },

  async mounted() {
    // create a media recorder (will prompt the user for permissions)
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });

        this.recorder = new MediaRecorder(stream);
        this.recorder.ondataavailable = (event) => this.chunks.push(event.data);
        this.recorder.onstop = this.onRecordingStopped;
      } catch (err) {
        console.error(
          `unable to create media recorder:\n\n${err.stack || err}`
        );
      }
    } else {
      console.error("sorry, media recording isn't supported on this browser");
    }
  },

  methods: {
    startRecording() {
      if (this.recorder !== null) {
        this.isRecording = true;
        this.startTime = new Date();
        this.stopTime = null;
        this.recorder.start();
      }
    },

    stopRecording() {
      if (this.recorder !== null) {
        this.isRecording = false;
        this.stopTime = new Date();

        this.recorder.stop();
      }
    },

    onRecordingStopped() {
      console.log(this.chunks.length);
      this.chunks = [];
    },
  },
});
</script>

<style scoped>
.recorder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
