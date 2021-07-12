<template>
  <div class="recorder">
    <record-timer :start-time="startTime" :stop-time="stopTime" />

    <record-button
      :is-recording="isRecording"
      :disabled="!isReadyToRecord || !!recordedAudio"
      @start="startRecording"
      @stop="stopRecording"
    />

    <div class="play-reset-btns">
      <play-button :recording="recordedAudio" />

      <button
        :disabled="!recordedAudio"
        class="reset-button"
        type="button"
        @click="reset"
      >
        reset
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useMediaRecorder from "@/composables/use-media-recorder";
import RecordButton from "./RecordButton.vue";
import RecordTimer from "./RecordTimer.vue";
import PlayButton from "./PlayButton.vue";

export default defineComponent({
  name: "Recorder",

  components: { RecordButton, RecordTimer, PlayButton },

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

    reset() {
      this.startTime = null;
      this.stopTime = null;
      this.recordedAudio = null;
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

.recorder > *:not(:last-child) {
  margin-bottom: 1rem;
}

.play-reset-btns {
  width: 20rem;
  display: flex;
  align-items: stretch;
}

.play-reset-btns > * {
  flex: 1;
}

.reset-button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left-width: 0;
}
</style>
