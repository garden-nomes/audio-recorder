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
import useMediaRecorder from "@/composables/use-media-recorder";
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

  setup() {
    return useMediaRecorder();
  },

  methods: {
    startRecording() {
      if (this.isReadyToRecord) {
        this.isRecording = true;
        this.startTime = new Date();
        this.stopTime = null;
        this.startMediaRecorder();
      }
    },

    stopRecording() {
      this.isRecording = false;
      this.stopTime = new Date();
      this.stopMediaRecorder();
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
